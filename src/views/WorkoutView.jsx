import { useState, useEffect } from "react";
import ExerciseSVG from "../components/ExerciseSVG";
import ProgressRing from "../components/ProgressRing";
import useTimer from "../hooks/useTimer";
import styles, { C } from "../components/styles";
import EXERCISE_GIFS from "../data/exerciseGifs";
import { saveLog, todayStr } from "../utils/storage";

// ─── WORKOUT VIEW (IMMERSIVE DARK PLAYER) ─────────────────────────────────────
const WorkoutView = ({
    day,
    currentExerciseIdx,
    setCurrentExerciseIdx,
    isResting,
    setIsResting,
    selectedWeek,
    selectedDay,
    workoutStartTime,
    onExit,
    onDone,
}) => {
    const [currentSet, setCurrentSet] = useState(1);
    const [confirmExit, setConfirmExit] = useState(false);
    const [showPhaseCard, setShowPhaseCard] = useState(false);
    const [timerFlash, setTimerFlash] = useState(false);

    const exercise = day?.exercises[currentExerciseIdx];
    const totalSets = parseInt(exercise?.sets) || 1;
    const timerDuration = isResting ? (exercise?.rest || 30) : (exercise?.time || 30);

    // ── Fix 1: Proper set tracking with auto-advance ──────────────────────────
    const { seconds, running, start, pause, reset } = useTimer(timerDuration, () => {
        // Fix 20: Vibrate on timer end
        if (navigator.vibrate) navigator.vibrate(isResting ? 100 : 200);
        // Fix 20: Flash timer color briefly
        setTimerFlash(true);
        setTimeout(() => setTimerFlash(false), 300);

        if (isResting) {
            if (currentSet < totalSets) {
                // Start next set
                setCurrentSet(s => s + 1);
                setIsResting(false);
                reset(exercise?.time || 30);
            } else {
                // All sets done — auto-advance to next exercise
                handleNextInternal();
            }
        } else {
            setIsResting(true);
            reset(exercise?.rest || 30);
        }
    });

    // Reset set counter when exercise changes
    useEffect(() => {
        setCurrentSet(1);
    }, [currentExerciseIdx]);

    // Fix 16: Smooth progress bar using timer fraction
    const timerFraction = 1 - seconds / timerDuration;
    const totalProgress = (currentExerciseIdx + timerFraction) / day.exercises.length;
    const progressBarWidth = `${Math.min(100, totalProgress * 100).toFixed(1)}%`;
    const progressRingValue = 1 - seconds / timerDuration;

    // Warmup / main split
    const warmupExs = day.exercises.filter(ex => ex.targets?.startsWith("Warmup:"));
    const mainExs = day.exercises.filter(ex => !ex.targets?.startsWith("Warmup:"));
    const warmupCount = warmupExs.length;

    // Fix 11: detect yoga
    const isYoga = day?.type === "yoga";

    // ── Internal advance (used by timer auto-advance and button) ──────────────
    const handleNextInternal = (fromButton = false) => {
        // Fix 19: Phase transition card (warmup → main)
        const isLastWarmup = currentExerciseIdx === warmupCount - 1 && warmupCount > 0;
        if (isLastWarmup && fromButton) {
            setShowPhaseCard(true);
            pause();
            setTimeout(() => {
                setShowPhaseCard(false);
                setCurrentExerciseIdx(warmupCount);
                setIsResting(false);
                setCurrentSet(1);
                reset(day.exercises[warmupCount]?.time || 30);
            }, 1500);
            return;
        }

        if (currentExerciseIdx < day.exercises.length - 1) {
            const next = currentExerciseIdx + 1;
            setCurrentExerciseIdx(next);
            setIsResting(false);
            setCurrentSet(1);
            reset(day.exercises[next]?.time || 30);
        } else {
            const durationMins = workoutStartTime ? Math.round((Date.now() - workoutStartTime) / 60000) : 0;
            saveLog(selectedWeek, selectedDay, {
                status: "completed",
                date: todayStr(),
                duration: durationMins,
                weekLabel: `Week ${selectedWeek + 1}`,
                dayLabel: day?.label || "",
                focus: day?.focus || "",
            });
            onDone();
        }
    };

    const handleNext = () => handleNextInternal(true);

    const handlePrev = () => {
        if (currentExerciseIdx > 0) {
            const prev = currentExerciseIdx - 1;
            setCurrentExerciseIdx(prev);
            setIsResting(false);
            setCurrentSet(1);
            reset(day.exercises[prev]?.time || 30);
        }
    };

    // Media rendering
    const renderMedia = () => {
        let mediaUrls = EXERCISE_GIFS[exercise?.name];
        if (!mediaUrls) return <ExerciseSVG name={exercise?.name} style={{ width: "180px", height: "180px", opacity: 0.9 }} />;
        if (!Array.isArray(mediaUrls)) mediaUrls = [mediaUrls];

        const isVideo = (url) => url?.match(/\.(mp4|webm)(\?.*)?$/i);
        const isImage = (url) => url?.match(/\.(gif|jpg|jpeg|png)(\?.*)?$/i)
            || url?.includes("popsugar-assets") || url?.includes("spotebi") || url?.includes("cloudfront");

        const videoUrl = mediaUrls.find(isVideo);
        const imageUrl = mediaUrls.find(isImage);

        return (
            <>
                {videoUrl ? (
                    <video src={videoUrl} autoPlay loop muted playsInline style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "12px" }} />
                ) : imageUrl ? (
                    <img src={imageUrl} alt={exercise?.name} style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "12px", objectFit: "contain" }} />
                ) : (
                    <ExerciseSVG name={exercise?.name} style={{ width: "180px", height: "180px", opacity: 0.9 }} />
                )}
            </>
        );
    };

    // Fix 11: Yoga-adaptive colors
    const ringColor = isYoga ? "var(--purple)" : (timerFlash ? "#fff" : (isResting ? "var(--muted)" : "var(--accent)"));

    return (
        <div
            className={`player-bg ${isResting ? "resting" : ""} ${isYoga ? "yoga-bg" : ""}`}
            style={{ minHeight: "100vh", position: "relative" }}
        >
            {/* Fix 16: Smooth continuous progress bar */}
            <div className="workout-progress">
                <div className="workout-progress-fill" style={{ width: progressBarWidth, transition: "width 0.5s linear" }} />
            </div>

            {/* Fix 19: Phase transition card */}
            {showPhaseCard && (
                <div style={{ position: "fixed", inset: 0, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, animation: "fadeIn 0.3s ease" }}>
                    <div style={{ textAlign: "center" }}>
                        <p className="label" style={{ marginBottom: "12px", color: "var(--accent)" }}>✅ Warmup Complete</p>
                        <h2 style={{ ...styles.heading, fontSize: "clamp(36px,8vw,56px)", fontWeight: 300, fontStyle: "italic" }}>
                            Main Workout
                        </h2>
                        <p style={{ color: "var(--muted)", marginTop: "12px", fontSize: "13px" }}>Get ready…</p>
                    </div>
                </div>
            )}

            {/* Fix 5: Back confirm overlay */}
            {confirmExit && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
                    <div className="clay-card" style={{ padding: "28px 24px", textAlign: "center", maxWidth: "300px", margin: "0 20px" }}>
                        <p style={{ fontSize: "20px", marginBottom: "8px" }}>Leave workout?</p>
                        <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "24px", lineHeight: 1.5 }}>Your progress this session will be lost.</p>
                        <button onClick={onExit} className="clay-btn" style={{ width: "100%", marginBottom: "10px", background: "var(--red)", color: "#fff" }}>Yes, Exit</button>
                        <button onClick={() => { setConfirmExit(false); start(); }} className="clay-btn-outline" style={{ width: "100%" }}>Keep Going</button>
                    </div>
                </div>
            )}

            <div style={{ maxWidth: "480px", margin: "0 auto", padding: "20px 24px 100px", boxSizing: "border-box" }}>
                {/* Top bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                    {/* Fix 5: Confirm before exit */}
                    <button style={{ fontSize: "20px", color: "var(--muted)" }} onClick={() => { pause(); setConfirmExit(true); }}>←</button>
                    <div style={{ textAlign: "center" }}>
                        <p className="label" style={{ fontSize: "9px" }}>
                            {isResting ? (isYoga ? "🧘 HOLD & BREATHE" : "BREATHE") : exercise?.targets}
                        </p>
                    </div>
                    <span className="label" style={{ fontSize: "9px" }}>{currentExerciseIdx + 1}/{day.exercises.length}</span>
                </div>

                {/* Exercise name + set info */}
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <h2 style={{ ...styles.heading, fontSize: "clamp(26px,6vw,38px)", fontWeight: 300, fontStyle: isResting ? "italic" : "normal", color: isResting ? "var(--muted)" : "var(--text)", margin: "0 0 4px" }}>
                        {isResting ? (isYoga ? "Breathe & Hold" : "Rest & Breathe") : exercise?.name}
                    </h2>

                    {/* Fix 1: Set label */}
                    <p className="label" style={{ fontSize: "10px" }}>
                        {exercise?.sets} sets · {exercise?.reps}
                        {!isResting && ` · Set ${currentSet} of ${totalSets}`}
                    </p>

                    {/* Fix 1: Set dots */}
                    {!isResting && totalSets > 1 && (
                        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "8px" }}>
                            {Array.from({ length: totalSets }, (_, i) => (
                                <span key={i} style={{ fontSize: "16px", color: i < currentSet ? "var(--accent)" : "var(--border)" }}>
                                    {i < currentSet ? "●" : "○"}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Media */}
                {!isResting && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "24px", minHeight: "180px" }}>
                        {renderMedia()}
                    </div>
                )}

                {/* Fix 11: yoga/work/rest ring color; Fix 20: flash on complete */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                    <ProgressRing value={progressRingValue} size={160} stroke={4} color={ringColor}>
                        <span style={{ ...styles.heading, fontSize: "52px", fontWeight: 300, color: ringColor, lineHeight: 1, transition: "color 0.3s" }}>
                            {seconds}
                        </span>
                        <span className="label" style={{ fontSize: "9px", marginTop: "4px" }}>
                            {isResting ? (isYoga ? "hold" : "rest") : "seconds"}
                        </span>
                    </ProgressRing>
                </div>

                {/* Tip */}
                <p style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", fontStyle: "italic", marginBottom: "24px", padding: "0 16px" }}>
                    {isResting
                        ? (isYoga ? "Focus on your breath. Return slowly." : "Shake out your muscles. Prepare for the next set.")
                        : `"${exercise?.benefits}"`}
                </p>

                {/* Controls */}
                <div style={{ display: "flex", gap: "12px", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <button className="clay-btn-outline" style={{ padding: "12px 20px" }} onClick={handlePrev} disabled={currentExerciseIdx === 0}>←</button>
                    <button className="clay-btn" style={{ padding: "16px 40px", fontSize: "14px" }} onClick={running ? pause : start}>
                        {running ? "⏸ Pause" : "▶ Start"}
                    </button>
                    <button className="clay-btn-outline" style={{ padding: "12px 20px" }} onClick={() => { pause(); setCurrentSet(1); reset(exercise?.time || 30); setIsResting(false); }}>↺</button>
                </div>

                <button className="clay-btn" style={{ width: "100%", padding: "14px" }} onClick={handleNext}>
                    {currentExerciseIdx === day.exercises.length - 1 ? "Complete Workout ✓" : "Next →"}
                </button>

                {/* Exercise list */}
                <div style={{ marginTop: "32px" }}>
                    {warmupExs.length > 0 && (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                <span className="label" style={{ color: "var(--accent)", fontSize: "9px" }}>🔥 WARMUP</span>
                                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                            </div>
                            {warmupExs.map((ex, i) => (
                                <div key={i} onClick={() => { setCurrentExerciseIdx(i); setIsResting(false); setCurrentSet(1); reset(ex.time || 30); pause(); }}
                                    style={{ display: "flex", gap: "10px", padding: "8px 12px", borderRadius: "8px", marginBottom: "4px", background: i === currentExerciseIdx ? "var(--surface2)" : "transparent", cursor: "pointer", alignItems: "center" }}>
                                    <span style={{ fontSize: "12px", width: "18px", color: "var(--accent)" }}>{i < currentExerciseIdx ? "✓" : i === currentExerciseIdx ? "▶" : "○"}</span>
                                    <span style={{ fontSize: "13px", color: i < currentExerciseIdx ? "var(--muted)" : "var(--text)" }}>{ex.name}</span>
                                    <span className="label" style={{ fontSize: "9px", marginLeft: "auto" }}>{ex.sets}×{ex.reps}</span>
                                </div>
                            ))}
                        </>
                    )}
                    {mainExs.length > 0 && (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "12px 0 8px" }}>
                                <span className="label" style={{ fontSize: "9px" }}>{isYoga ? "🧘 YOGA SESSION" : "💪 MAIN WORKOUT"}</span>
                                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                            </div>
                            {mainExs.map((ex, i) => {
                                const globalIdx = warmupCount + i;
                                return (
                                    <div key={i} onClick={() => { setCurrentExerciseIdx(globalIdx); setIsResting(false); setCurrentSet(1); reset(ex.time || 30); pause(); }}
                                        style={{ display: "flex", gap: "10px", padding: "8px 12px", borderRadius: "8px", marginBottom: "4px", background: globalIdx === currentExerciseIdx ? "var(--surface2)" : "transparent", cursor: "pointer", alignItems: "center" }}>
                                        <span style={{ fontSize: "12px", width: "18px", color: "var(--accent)" }}>{globalIdx < currentExerciseIdx ? "✓" : globalIdx === currentExerciseIdx ? "▶" : "○"}</span>
                                        <span style={{ fontSize: "13px", color: globalIdx < currentExerciseIdx ? "var(--muted)" : "var(--text)" }}>{ex.name}</span>
                                        <span className="label" style={{ fontSize: "9px", marginLeft: "auto" }}>{ex.sets}×{ex.reps}</span>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkoutView;
