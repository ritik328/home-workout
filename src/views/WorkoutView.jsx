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
    const exercise = day?.exercises[currentExerciseIdx];
    const timerDuration = isResting ? (exercise?.rest || 30) : (exercise?.time || 30);

    const { seconds, running, start, pause, reset } = useTimer(timerDuration, () => {
        if (isResting) {
            setIsResting(false);
            reset(day?.exercises[currentExerciseIdx]?.time || 30);
        } else {
            setIsResting(true);
            reset(day?.exercises[currentExerciseIdx]?.rest || 30);
        }
    });

    const totalDuration = timerDuration;
    const progress = 1 - seconds / totalDuration;

    const handleNext = () => {
        if (currentExerciseIdx < day.exercises.length - 1) {
            const next = currentExerciseIdx + 1;
            setCurrentExerciseIdx(next);
            setIsResting(false);
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

    const handlePrev = () => {
        if (currentExerciseIdx > 0) {
            const prev = currentExerciseIdx - 1;
            setCurrentExerciseIdx(prev);
            setIsResting(false);
            reset(day.exercises[prev]?.time || 30);
        }
    };

    // Media rendering
    const renderMedia = () => {
        let mediaUrls = EXERCISE_GIFS[exercise?.name];
        if (!mediaUrls) return <ExerciseSVG name={exercise?.name} style={{ width: "180px", height: "180px", opacity: 0.9 }} />;
        if (!Array.isArray(mediaUrls)) mediaUrls = [mediaUrls];

        const isVideo = (url) => url?.match(/\.(mp4|webm)(\?.*)?$/i);
        const isImage = (url) => url?.match(/\.(gif|jpg|jpeg|png)(\?.*)?$/i) || url?.includes("cloudinary") || url?.includes("images.ctfassets") || url?.includes("popsugar-assets") || url?.includes("spotebi") || url?.includes("cloudfront");

        const videoUrl = mediaUrls.find(isVideo);
        const imageUrl = mediaUrls.find(isImage);
        const articleUrl = mediaUrls.find(u => !isVideo(u) && !isImage(u));

        return (
            <>
                {videoUrl ? (
                    <video src={videoUrl} autoPlay loop muted playsInline style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "12px" }} />
                ) : imageUrl ? (
                    <img src={imageUrl} alt={exercise?.name} style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "12px", objectFit: "contain" }} />
                ) : (
                    <ExerciseSVG name={exercise?.name} style={{ width: "180px", height: "180px", opacity: 0.9 }} />
                )}
                {articleUrl && !imageUrl && !videoUrl && (
                    <a href={articleUrl} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: C.accent, textDecoration: "none", letterSpacing: "0.1em" }}>
                        View Tutorial ↗
                    </a>
                )}
            </>
        );
    };

    // Warmup or main
    const warmupExs = day.exercises.filter(ex => ex.targets?.startsWith("Warmup:"));
    const mainExs = day.exercises.filter(ex => !ex.targets?.startsWith("Warmup:"));
    const warmupCount = warmupExs.length;

    return (
        <div className={`player-bg ${isResting ? "resting" : ""}`} style={{ minHeight: "100vh", position: "relative" }}>
            {/* Gold hairline progress bar */}
            <div className="workout-progress">
                <div className="workout-progress-fill" style={{ width: `${(currentExerciseIdx / day.exercises.length) * 100}%` }} />
            </div>

            <div style={{ maxWidth: "480px", margin: "0 auto", padding: "20px 24px 100px", boxSizing: "border-box" }}>
                {/* Top bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                    <button style={{ fontSize: "20px", color: C.muted }} onClick={() => { pause(); onExit(); }}>←</button>
                    <div style={{ textAlign: "center" }}>
                        <p className="label" style={{ fontSize: "9px" }}>
                            {isResting ? "BREATHE" : exercise?.targets}
                        </p>
                    </div>
                    <span className="label" style={{ fontSize: "9px" }}>{currentExerciseIdx + 1}/{day.exercises.length}</span>
                </div>

                {/* Exercise name */}
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <h2 style={{ ...styles.heading, fontSize: "38px", fontWeight: 300, fontStyle: isResting ? "italic" : "normal", color: isResting ? C.muted : C.text, margin: "0 0 4px" }}>
                        {isResting ? "Rest & Breathe" : exercise?.name}
                    </h2>
                    <p className="label" style={{ fontSize: "10px" }}>{exercise?.sets} sets · {exercise?.reps}</p>
                </div>

                {/* Media */}
                {!isResting && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "24px", minHeight: "180px" }}>
                        {renderMedia()}
                    </div>
                )}

                {/* Gold ring timer */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                    <ProgressRing value={progress} size={160} stroke={4} color={isResting ? C.muted : C.accent}>
                        <span style={{ ...styles.heading, fontSize: "52px", fontWeight: 300, color: isResting ? C.muted : C.accent, lineHeight: 1 }}>
                            {seconds}
                        </span>
                        <span className="label" style={{ fontSize: "9px", marginTop: "4px" }}>
                            {isResting ? "rest" : "seconds"}
                        </span>
                    </ProgressRing>
                </div>

                {/* Benefits / tip */}
                <p style={{ textAlign: "center", fontSize: "13px", color: C.muted, fontStyle: "italic", marginBottom: "24px", padding: "0 16px" }}>
                    {isResting ? "Shake out your muscles. Prepare for the next set." : `"${exercise?.benefits}"`}
                </p>

                {/* Controls */}
                <div style={{ display: "flex", gap: "12px", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <button style={{ ...styles.btnOutline, padding: "12px 20px" }} onClick={handlePrev} disabled={currentExerciseIdx === 0}>←</button>
                    <button style={{ ...styles.btn, padding: "16px 40px", fontSize: "14px" }} onClick={running ? pause : start}>
                        {running ? "⏸ Pause" : "▶ Start"}
                    </button>
                    <button style={{ ...styles.btnOutline, padding: "12px 20px" }} onClick={() => { pause(); reset(exercise?.time || 30); setIsResting(false); }}>↺</button>
                </div>

                <button style={{ ...styles.btn, width: "100%", padding: "14px", background: "transparent", border: `1px solid ${C.accent}`, color: C.accent }} onClick={handleNext}>
                    {currentExerciseIdx === day.exercises.length - 1 ? "Complete ✓" : "Next →"}
                </button>

                {/* Exercise list */}
                <div style={{ marginTop: "32px" }}>
                    {warmupExs.length > 0 && (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                <span className="label" style={{ color: C.accent, fontSize: "9px" }}>🔥 WARMUP</span>
                                <div style={{ flex: 1, height: "1px", background: C.border }} />
                            </div>
                            {warmupExs.map((ex, i) => (
                                <div key={i} onClick={() => { setCurrentExerciseIdx(i); setIsResting(false); reset(ex.time || 30); pause(); }}
                                    style={{ display: "flex", gap: "10px", padding: "8px 12px", borderRadius: "8px", marginBottom: "4px", background: i === currentExerciseIdx ? C.surface2 : "transparent", cursor: "pointer", alignItems: "center" }}>
                                    <span style={{ fontSize: "12px", width: "18px", color: C.accent }}>{i < currentExerciseIdx ? "✓" : i === currentExerciseIdx ? "▶" : "○"}</span>
                                    <span style={{ fontSize: "13px", color: i < currentExerciseIdx ? C.muted : C.text }}>{ex.name}</span>
                                    <span className="label" style={{ fontSize: "9px", marginLeft: "auto" }}>{ex.sets}×{ex.reps}</span>
                                </div>
                            ))}
                        </>
                    )}
                    {mainExs.length > 0 && (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "12px 0 8px" }}>
                                <span className="label" style={{ fontSize: "9px" }}>💪 MAIN WORKOUT</span>
                                <div style={{ flex: 1, height: "1px", background: C.border }} />
                            </div>
                            {mainExs.map((ex, i) => {
                                const globalIdx = warmupCount + i;
                                return (
                                    <div key={i} onClick={() => { setCurrentExerciseIdx(globalIdx); setIsResting(false); reset(ex.time || 30); pause(); }}
                                        style={{ display: "flex", gap: "10px", padding: "8px 12px", borderRadius: "8px", marginBottom: "4px", background: globalIdx === currentExerciseIdx ? C.surface2 : "transparent", cursor: "pointer", alignItems: "center" }}>
                                        <span style={{ fontSize: "12px", width: "18px", color: C.accent }}>{globalIdx < currentExerciseIdx ? "✓" : globalIdx === currentExerciseIdx ? "▶" : "○"}</span>
                                        <span style={{ fontSize: "13px", color: globalIdx < currentExerciseIdx ? C.muted : C.text }}>{ex.name}</span>
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
