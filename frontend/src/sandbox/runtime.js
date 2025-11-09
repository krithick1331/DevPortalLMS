// Deterministic sandbox runtime: virtual clock, fetch shim, replay log

export function createSandboxAPI() {
    const replayLog = [];
    let now = 1000000000000; // fixed epoch for determinism

    const orig = {
        Date: window.Date,
        setTimeout: window.setTimeout,
        setInterval: window.setInterval,
        clearTimeout: window.clearTimeout,
        clearInterval: window.clearInterval,
        requestAnimationFrame: window.requestAnimationFrame,
        cancelAnimationFrame: window.cancelAnimationFrame,
        fetch: window.fetch,
        performanceNow: window.performance.now.bind(window.performance),
    };

    // Virtual time
    class VDate extends Date {
        constructor(...args) {
            if (args.length === 0) super(now);
            else super(...args);
        }
        static now() { return now; }
    }

    let timers = [];
    function tick(ms = 16) {
        now += ms;
        // flush RAF callbacks
        const cbs = rafCbs.slice();
        rafCbs = [];
        cbs.forEach(cb => cb(now));
    }

    // Virtual timers
    function vSetTimeout(cb, delay = 0, ...args) {
        const id = Math.random().toString(36).slice(2);
        timers.push({ id, at: now + delay, cb, args, type: 'timeout' });
        return id;
    }
    function vClearTimeout(id) {
        timers = timers.filter(t => t.id !== id);
    }
    function vSetInterval(cb, interval = 0, ...args) {
        const id = Math.random().toString(36).slice(2);
        timers.push({ id, at: now + interval, cb, args, type: 'interval', interval });
        return id;
    }
    function vClearInterval(id) { vClearTimeout(id); }

    // RAF
    let rafCbs = [];
    function vRAF(cb) { rafCbs.push(cb); return Math.random(); }
    function vCancelRAF() { }

    // Step function to progress time and run callbacks deterministically
    function step(ms = 16) {
        const target = now + ms;
        while (true) {
            // find next timer
            const next = timers.reduce((m, t) => (!m || t.at < m.at ? t : m), null);
            if (!next || next.at > target) break;
            now = next.at;
            timers = timers.filter(t => t !== next);
            try { next.cb(...next.args); } catch (e) { replayLog.push({ type: 'error', at: now, msg: e.message }); }
            if (next.type === 'interval') {
                next.at = now + (next.interval || 0);
                timers.push(next);
            }
        }
        // advance to target and flush RAF once
        now = target;
        tick(0);
    }

    // Fetch shim (mock-only unless explicitly allowed)
    const mockRegistry = new Map();
    function registerMock(url, response) { mockRegistry.set(url, response); }
    async function vFetch(url, opts = {}) {
        replayLog.push({ type: 'fetch', at: now, url });
        if (mockRegistry.has(url)) {
            const body = mockRegistry.get(url);
            return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
        // Block external calls in sandbox by default
        throw new Error('Network blocked in sandbox: ' + url);
    }

    // Install overrides
    function install() {
        window.Date = VDate;
        window.setTimeout = vSetTimeout;
        window.clearTimeout = vClearTimeout;
        window.setInterval = vSetInterval;
        window.clearInterval = vClearInterval;
        window.requestAnimationFrame = vRAF;
        window.cancelAnimationFrame = vCancelRAF;
        window.fetch = vFetch;
        // deterministic performance.now
        window.performance.now = () => now - 1000000000000;
    }
    function restore() {
        window.Date = orig.Date;
        window.setTimeout = orig.setTimeout;
        window.clearTimeout = orig.clearTimeout;
        window.setInterval = orig.setInterval;
        window.clearInterval = orig.clearInterval;
        window.requestAnimationFrame = orig.requestAnimationFrame;
        window.cancelAnimationFrame = orig.cancelAnimationFrame;
        window.fetch = orig.fetch;
        window.performance.now = orig.performanceNow;
    }

    return {
        install, restore, step, tick, registerMock,
        getReplay: () => replayLog.slice(),
        getNow: () => now
    };
}
