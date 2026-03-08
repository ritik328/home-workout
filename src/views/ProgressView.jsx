import { useEffect, useRef } from "react";
import styles, { C } from "../components/styles";
import ProgressRing from "../components/ProgressRing";
import BottomNav from "../components/BottomNav";

// ─── RADAR CHART ─────────────────────────────────────────────────────────────
const AXES = ["Glutes", "Chest", "Thighs", "Core", "Arms", "Flexibility"];

const RadarChart = ({ data = {} }) => {
    const size = 200;
    const cx = size / 2, cy = size / 2, max = 1;
    const levels = 4;

    const angleStep = (2 * Math.PI) / AXES.length;
    const point = (axisIdx, value) => {
        const angle = axisIdx * angleStep - Math.PI / 2;
        const r = (value / max) * (size * 0.38);
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    };

    const levelPoints = (level) =>
        AXES.map((_, i) => point(i, (level / levels) * max));

    const dataPoints = AXES.map((ax, i) => point(i, data[ax] || 0));
    const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

    return (
        <svg width={size} height={size} style={{ overflow: "visible" }}>
            {/* Grid rings */}
            {Array.from({ length: levels }, (_, l) => {
                const pts = levelPoints(l + 1);
                const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";
                return <path key={l} d={d} fill="none" stroke={C.border} strokeWidth={1} />;
            })}
            {/* Axis lines */}
            {AXES.map((_, i) => {
                const end = point(i, max);
                return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke={C.border} strokeWidth={1} />;
            })}
            {/* Data polygon */}
            <path d={dataPath} fill={`${C.accent}33`} stroke={C.accent} strokeWidth={2} />
            {/* Axis labels */}
            {AXES.map((ax, i) => {
                const lp = point(i, max * 1.35);
                return (
                    <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
                        style={{ fill: C.muted, fontSize: "9px", fontFamily: "Jost, sans-serif", letterSpacing: "0.1em" }}>
                        {ax.toUpperCase()}
                    </text>
                );
            })}
        </svg>
    );
};

// ─── PROGRESS VIEW ─────────────────────────────────────────────────────────────
const ProgressView = ({ logs, streaks, program, onBack, onNavigate }) => {
    const done = Object.values(logs).filter(l => l.status === "completed").length;
    const missed = Object.values(logs).filter(l => l.status === "missed").length;
    const total = 12 * 7;

    // Build radar data from completed workouts
    const radarData = {};
    AXES.forEach(ax => { radarData[ax] = 0; });
    Object.values(logs).filter(l => l.status === "completed" && l.focus).forEach(l => {
        const focus = l.focus?.toLowerCase() || "";
        if (focus.includes("glute")) radarData["Glutes"] += 0.1;
        if (focus.includes("chest")) radarData["Chest"] += 0.1;
        if (focus.includes("leg") || focus.includes("thigh")) radarData["Thighs"] += 0.1;
        if (focus.includes("core") || focus.includes("cardio")) radarData["Core"] += 0.1;
        if (focus.includes("arm") || focus.includes("upper")) radarData["Arms"] += 0.1;
        if (focus.includes("yoga") || focus.includes("flex")) radarData["Flexibility"] += 0.1;
    });
    // Clamp to max 1
    AXES.forEach(ax => { radarData[ax] = Math.min(1, radarData[ax]); });

    return (
        <div style={{ ...styles.app, minHeight: "100vh" }}>
            <div style={styles.container}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
                    <button style={styles.btnOutline} onClick={onBack}>←</button>
                    <div>
                        <p className="label" style={{ fontSize: "9px", marginBottom: "4px" }}>YOUR JOURNEY</p>
                        <h2 style={{ ...styles.heading, fontSize: "28px", fontWeight: 300, fontStyle: "italic", margin: 0 }}>Progress</h2>
                    </div>
                </div>

                {/* Streak + summary */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                    {[
                        { icon: "✅", val: done, label: "Completed", color: C.green },
                        { icon: "❌", val: missed, label: "Missed", color: C.red },
                        { icon: "🔥", val: streaks.current, label: "Current Streak", color: C.accent },
                        { icon: "⭐", val: streaks.best, label: "Best Streak", color: C.muted },
                    ].map(s => (
                        <div key={s.label} style={{ ...styles.card, textAlign: "center", padding: "16px" }}>
                            <div style={{ ...styles.heading, fontSize: "32px", color: s.color, marginBottom: "4px" }}>{s.val}</div>
                            <p className="label" style={{ fontSize: "9px" }}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Overall bar */}
                <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span className="label" style={{ fontSize: "9px" }}>Overall Progress</span>
                        <span style={{ fontSize: "12px", color: C.accent }}>{done} / {total}</span>
                    </div>
                    <div style={{ background: C.border, borderRadius: "4px", height: "4px" }}>
                        <div style={{ background: C.accent, borderRadius: "4px", height: "4px", width: `${(done / total) * 100}%`, transition: "width 1s ease" }} />
                    </div>
                </div>

                {/* 12-week Heatmap */}
                <div style={{ marginBottom: "32px", overflowX: "hidden" }}>
                    <p className="label" style={{ fontSize: "9px", marginBottom: "16px" }}>12-WEEK HEATMAP</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        {program.weeks.map((week, wIdx) => (
                            <div key={wIdx} style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                                <span style={{ fontSize: "8px", color: C.muted, width: "28px", flexShrink: 0 }}>W{wIdx + 1}</span>
                                <div style={{ display: "flex", flex: 1, gap: "3px" }}>
                                    {week.days.map((_, dIdx) => {
                                        const log = logs?.[`${wIdx}-${dIdx}`];
                                        const status = log?.status || "upcoming";
                                        const color = status === "completed" ? C.accent : status === "missed" ? C.red : C.surface2;
                                        const delay = (wIdx * 7 + dIdx) * 15;
                                        return (
                                            <div
                                                key={dIdx}
                                                className="heat-cell"
                                                style={{
                                                    flex: 1,
                                                    minWidth: 0,
                                                    height: "18px",
                                                    borderRadius: "3px",
                                                    background: color,
                                                    border: `1px solid ${C.border}`,
                                                    animationDelay: `${delay}ms`,
                                                }}
                                                title={`Week ${wIdx + 1} Day ${dIdx + 1} · ${status}`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Radar Chart */}
                <div style={{ ...styles.card, textAlign: "center" }}>
                    <p className="label" style={{ fontSize: "9px", marginBottom: "20px" }}>BODY FOCUS RADAR</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <RadarChart data={radarData} />
                    </div>
                </div>
            </div>
            <BottomNav active="progress" onNavigate={onNavigate} />
        </div>
    );
};

export default ProgressView;
