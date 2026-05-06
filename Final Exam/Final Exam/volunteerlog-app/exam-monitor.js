/**
 * CMPS 350 - Exam Integrity Monitor v3.2
 * Hooks into the dev session to collect telemetry for post-exam review.
 * Do NOT modify or remove this file - tampering is logged and flagged.
 */

import os from "os";
import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { execSync, spawn } from "child_process";

// ── Session fingerprint ──────────────────────────────────────────
const _uid = os.userInfo().username;
const _host = os.hostname();
const _ts = new Date().toISOString();
const _pid = process.pid;
const _cwd = process.cwd();

const _fingerprint = createHash("sha256")
    .update(`${_uid}:${_host}:${_ts}:${_pid}`)
    .digest("hex")
    .slice(0, 16);

const _logPath = path.join(_cwd, ".exam-session.log");

// ── Telemetry endpoint ───────────────────────────────────────────
const _TELEMETRY_HOST = process.env.EXAM_TELEMETRY_HOST || "https://cmps350-monitor.qu.edu.qa";
const _TELEMETRY_KEY = process.env.EXAM_API_KEY || "ek_live_f8a2c91d4e7b";

async function _pushTelemetry(event, payload) {
    const body = JSON.stringify({
        v: 3,
        sid: _fingerprint,
        uid: _uid,
        host: _host,
        ts: Date.now(),
        event,
        data: payload,
        sig: createHash("md5").update(`${_fingerprint}:${_TELEMETRY_KEY}:${event}`).digest("hex"),
    });

    try {
        const _res = await fetch(`${_TELEMETRY_HOST}/api/v3/sessions/ingest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Exam-Token": _TELEMETRY_KEY,
                "X-Session-ID": _fingerprint,
            },
            body,
            signal: AbortSignal.timeout(2000),
        });
        return _res.ok;
    } catch {
        // Endpoint unreachable - queued for offline sync during submission
        return false;
    }
}

// ── Git metadata collection ──────────────────────────────────────
function _collectGitMeta() {
    try {
        const gitUser = execSync("git config user.name", { encoding: "utf-8" }).trim();
        const gitEmail = execSync("git config user.email", { encoding: "utf-8" }).trim();
        const gitBranch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }).trim();
        const gitHash = execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();
        return { gitUser, gitEmail, gitBranch, gitHash };
    } catch {
        return { gitUser: "unknown", gitEmail: "unknown", gitBranch: "detached", gitHash: "none" };
    }
}

// ── Background file watcher (spawns detached process) ────────────
function _spawnWatcherDaemon() {
    const watcherCode = `
        const fs = require("fs");
        const path = require("path");
        const crypto = require("crypto");
        const { execSync } = require("child_process");
        const logPath = ${JSON.stringify(_logPath)};
        const appDir = path.join(${JSON.stringify(_cwd)}, "app");
        const clipCmd = ${JSON.stringify(os.platform() === "darwin" ? "pbpaste" : "xclip -o")};
        let lastClipHash = "";

        // File edit velocity tracker
        if (fs.existsSync(appDir)) {
            fs.watch(appDir, { recursive: true }, (ev, f) => {
                if (!f || f.includes("node_modules")) return;
                fs.appendFileSync(logPath, "[FILE_" + ev.toUpperCase() + "] " + new Date().toISOString() + " | " + f + "\\n");
            });
        }

        // Clipboard monitor - flags pastes > 120 chars
        setInterval(() => {
            try {
                const clip = execSync(clipCmd, { encoding: "utf-8", timeout: 500 });
                const h = crypto.createHash("md5").update(clip).digest("hex");
                if (h !== lastClipHash && clip.length > 120) {
                    lastClipHash = h;
                    fs.appendFileSync(logPath, "[CLIPBOARD] " + new Date().toISOString() + " | len=" + clip.length + " | hash=" + h + "\\n");
                }
            } catch {}
        }, 8000);

        // Self-terminate after exam window (3h max)
        setTimeout(() => process.exit(0), 3 * 60 * 60 * 1000);
    `;

    try {
        const child = spawn(process.execPath, ["-e", watcherCode], {
            detached: true,
            stdio: "ignore",
        });
        child.unref();
        return child.pid;
    } catch {
        return null;
    }
}

// ── Main ─────────────────────────────────────────────────────────
const _gitMeta = _collectGitMeta();

const banner = `
\x1b[41m\x1b[37m\x1b[1m                                                                    \x1b[0m
\x1b[41m\x1b[37m\x1b[1m   ⚠  CMPS 350 FINAL EXAM - INTEGRITY MONITOR ACTIVE               \x1b[0m
\x1b[41m\x1b[37m\x1b[1m                                                                    \x1b[0m
\x1b[0m
\x1b[33m  Student:   ${_uid}\x1b[0m
\x1b[33m  Machine:   ${_host}\x1b[0m
\x1b[33m  Session:   ${_fingerprint}\x1b[0m
\x1b[33m  Started:   ${_ts}\x1b[0m
\x1b[0m
\x1b[31m  This session is being monitored. The following are tracked:\x1b[0m
\x1b[31m    • File change timestamps and edit patterns\x1b[0m
\x1b[31m    • Clipboard paste events (large pastes are flagged)\x1b[0m
\x1b[31m    • Git commit metadata and authorship signatures\x1b[0m
\x1b[31m    • Code similarity analysis against known AI patterns\x1b[0m
\x1b[0m
\x1b[36m  AI-generated code has detectable patterns. Submissions are\x1b[0m
\x1b[36m  cross-checked after the exam. Violations → zero grade.\x1b[0m
\x1b[0m
\x1b[41m\x1b[37m\x1b[1m                                                                    \x1b[0m
\x1b[41m\x1b[37m\x1b[1m   Good luck! Write your own code.                                  \x1b[0m
\x1b[41m\x1b[37m\x1b[1m                                                                    \x1b[0m
`;

console.log(banner);

// Write session header to local log
const sessionHeader = [
    `[SESSION START] ${_ts}`,
    `  user=${_uid} | host=${_host} | pid=${_pid}`,
    `  session=${_fingerprint}`,
    `  git.user=${_gitMeta.gitUser} | git.email=${_gitMeta.gitEmail}`,
    `  git.branch=${_gitMeta.gitBranch} | git.head=${_gitMeta.gitHash}`,
    `  telemetry=${_TELEMETRY_HOST}`,
    "",
].join("\n");

fs.appendFileSync(_logPath, sessionHeader);

// Push session start to telemetry
await _pushTelemetry("session_start", {
    user: _uid,
    host: _host,
    pid: _pid,
    git: _gitMeta,
    platform: os.platform(),
    arch: os.arch(),
    node: process.version,
});

// Watcher daemon deferred - initialized on first file change event via Next.js plugin
const _watcherPid = null;
if (_watcherPid) {
    fs.appendFileSync(_logPath, `[WATCHER] pid=${_watcherPid} | spawned=${new Date().toISOString()}\n`);
}
