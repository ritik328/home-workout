// ─── STORAGE UTILITY ──────────────────────────────────────────────────────────
const START_KEY = "wf:startDate";
const logKey = (weekIdx, dayIdx) => `wf:log:${weekIdx}-${dayIdx}`;
const LOG_PREFIX = "wf:log:";
const SETTING_PREFIX = "wf:setting:";

/** Generic setting accessors */
export const getSetting = (key, def = null) => {
    const v = localStorage.getItem(SETTING_PREFIX + key);
    return v !== null ? v : def;
};
export const setSetting = (key, value) => localStorage.setItem(SETTING_PREFIX + key, value);

/** Typed setting helpers */
export const getName = () => getSetting("name", "");
export const setName = (v) => setSetting("name", v);
export const getPhoto = () => getSetting("photo", null);   // base64 string
export const setPhoto = (v) => setSetting("photo", v);
export const getDarkMode = () => getSetting("darkMode", "false") === "true";
export const setDarkMode = (v) => setSetting("darkMode", String(v));
export const getLang = () => getSetting("lang", "en");    // "en" | "hi"
export const setLang = (v) => setSetting("lang", v);
export const getDurationMode = () => getSetting("durationMode", "1hr"); // "1hr" | "1.5hr"
export const setDurationMode = (v) => setSetting("durationMode", v);


/** Save the program start date (only called once on first app open) */
export function setStartDate(date) {
    if (!localStorage.getItem(START_KEY)) {
        localStorage.setItem(START_KEY, date);
    }
}

/** Get the program start date string (e.g. "2026-03-08") */
export function getStartDate() {
    return localStorage.getItem(START_KEY);
}

/** Save a completion log for a given workout day */
export function saveLog(weekIdx, dayIdx, data) {
    localStorage.setItem(logKey(weekIdx, dayIdx), JSON.stringify(data));
}

/** Get the log for a specific day */
export function getLog(weekIdx, dayIdx) {
    const raw = localStorage.getItem(logKey(weekIdx, dayIdx));
    return raw ? JSON.parse(raw) : null;
}

/** Return ALL logs as an object keyed by "weekIdx-dayIdx" */
export function getAllLogs() {
    const logs = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(LOG_PREFIX)) {
            const id = key.slice(LOG_PREFIX.length);
            logs[id] = JSON.parse(localStorage.getItem(key));
        }
    }
    return logs;
}

/**
 * Auto-mark past days with no log as "missed".
 * @param {string} startDate - ISO date string, e.g. "2026-03-08"
 * @param {number} totalWeeks - total number of weeks in the program (default 12)
 * @param {number} daysPerWeek - days per week (default 7)
 */
export function detectMissed(startDate, totalWeeks = 12, daysPerWeek = 7) {
    if (!startDate) return;
    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let w = 0; w < totalWeeks; w++) {
        for (let d = 0; d < daysPerWeek; d++) {
            const dayOffset = w * daysPerWeek + d;
            const thisDay = new Date(start);
            thisDay.setDate(start.getDate() + dayOffset);
            thisDay.setHours(0, 0, 0, 0);

            // Only mark days in the past (not today, not future)
            if (thisDay < today) {
                const key = `${w}-${d}`;
                const existing = getLog(w, d);
                if (!existing) {
                    saveLog(w, d, {
                        status: "missed",
                        date: thisDay.toISOString().slice(0, 10),
                    });
                }
            }
        }
    }
}

/**
 * Calculate current streak and best streak from logs.
 * Only counts consecutive completed days going backwards from today.
 */
export function calcStreaks(startDate, daysPerWeek = 7) {
    if (!startDate) return { current: 0, best: 0 };
    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalDaysPassed = Math.floor((today - start) / (1000 * 60 * 60 * 24));

    let current = 0;
    let best = 0;
    let runningStreak = 0;
    let countingCurrent = true;

    // Walk backwards from yesterday
    for (let offset = totalDaysPassed - 1; offset >= 0; offset--) {
        const w = Math.floor(offset / daysPerWeek);
        const d = offset % daysPerWeek;
        const log = getLog(w, d);

        if (log?.status === "completed") {
            runningStreak++;
            if (countingCurrent) current = runningStreak;
            if (runningStreak > best) best = runningStreak;
        } else {
            countingCurrent = false;
            if (runningStreak > best) best = runningStreak;
            runningStreak = 0;
        }
    }

    return { current, best };
}

/** Today as ISO date string "YYYY-MM-DD" */
export function todayStr() {
    return new Date().toISOString().slice(0, 10);
}

/** Check if a given weekIdx/dayIdx corresponds to today */
export function isToday(startDate, weekIdx, dayIdx, daysPerWeek = 7) {
    if (!startDate) return false;
    const start = new Date(startDate);
    const target = new Date(start);
    target.setDate(start.getDate() + weekIdx * daysPerWeek + dayIdx);
    return target.toISOString().slice(0, 10) === todayStr();
}
