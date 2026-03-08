import { useState, useEffect, useRef } from "react";

// ─── TIMER HOOK ───────────────────────────────────────────────────────────────
function useTimer(initialSeconds, onComplete) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [running, setRunning] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (running && seconds > 0) {
            ref.current = setInterval(() => setSeconds(s => s - 1), 1000);
        } else if (seconds === 0 && running) {
            setRunning(false);
            onComplete && onComplete();
        }
        return () => clearInterval(ref.current);
    }, [running, seconds]);

    const start = () => setRunning(true);
    const pause = () => setRunning(false);
    const reset = (s) => { setRunning(false); setSeconds(s ?? initialSeconds); };

    return { seconds, running, start, pause, reset };
}

export default useTimer;
