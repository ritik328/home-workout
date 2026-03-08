import { useRef, useEffect } from "react";
import styles from "../components/styles";
import { getName, getPhoto, getAllLogs, calcStreaks, getStartDate } from "../utils/storage";

// ─── SHARE VIEW ──────────────────────────────────────────────────────────────
const ShareView = ({ day, selectedWeek, selectedDay, onBack }) => {
    const canvasRef = useRef(null);
    const name = getName() || "Champion";
    const photo = getPhoto();
    const logs = getAllLogs();
    const streaks = calcStreaks(getStartDate());
    const done = Object.values(logs).filter(l => l.status === "completed").length;

    // ── Draw the Instagram card onto the canvas ────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = 1080, H = 1080;
        canvas.width = W;
        canvas.height = H;

        // ─ Background gradient
        const bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, "#f5f0e8");
        bg.addColorStop(0.5, "#f0e8d8");
        bg.addColorStop(1, "#e8dcc8");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // ─ Decorative left accent bar
        ctx.fillStyle = "#3a3028";
        ctx.fillRect(80, 120, 6, 300);

        // ─ Top label
        ctx.font = "bold 28px sans-serif";
        ctx.fillStyle = "#8b7355";
        ctx.letterSpacing = "6px";
        ctx.fillText("WORKOUT COMPLETE", 110, 170);

        // ─ Big name
        ctx.font = "italic 100px Georgia";
        ctx.fillStyle = "#3a3028";
        ctx.fillText(name, 110, 300);

        // ─ Workout label (week + focus)
        ctx.font = "400 38px sans-serif";
        ctx.fillStyle = "#6b5a3e";
        const weekLabel = day ? `Week ${selectedWeek + 1} · ${day.label}` : "";
        ctx.fillText(weekLabel, 110, 380);

        // ─ Focus title
        ctx.font = "300 52px Georgia";
        ctx.fillStyle = "#3a3028";
        const focusLabel = day?.focus || "";
        ctx.fillText(focusLabel, 110, 450);

        // ─ Divider
        ctx.strokeStyle = "#c8b89a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(110, 510);
        ctx.lineTo(970, 510);
        ctx.stroke();

        // ─ Stats row
        const stats = [
            { label: "🔥 Streak", value: `${streaks.current} days` },
            { label: "✅ Completed", value: `${done} sessions` },
            { label: "⭐ Best", value: `${streaks.best} days` },
        ];
        stats.forEach((s, i) => {
            const x = 110 + i * 310;
            ctx.font = "bold 64px sans-serif";
            ctx.fillStyle = "#3a3028";
            ctx.fillText(s.value, x, 630);
            ctx.font = "400 26px sans-serif";
            ctx.fillStyle = "#8b7355";
            ctx.fillText(s.label, x, 670);
        });

        // ─ Exercise list (up to 5 non-warmup)
        const mainExercises = day?.exercises?.filter(e => !e.targets?.startsWith("Warmup:")).slice(0, 5) || [];
        ctx.font = "300 30px sans-serif";
        ctx.fillStyle = "#5a4838";
        mainExercises.forEach((ex, i) => {
            ctx.fillText(`○  ${ex.name}`, 110, 740 + i * 48);
        });

        // ─ Profile photo (if exists) — top right circle
        const drawRest = () => {
            // ─ Bottom brand / tagline
            ctx.font = "italic 26px Georgia";
            ctx.fillStyle = "#a08060";
            ctx.fillText("12-Week Transformation · Form & Strength", 110, 1010);

            // ─ Decorative corner dots
            [[950, 950], [970, 930], [990, 950]].forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = "#c8b89a";
                ctx.fill();
            });
        };

        if (photo) {
            const img = new Image();
            img.onload = () => {
                // Clip to circle
                ctx.save();
                ctx.beginPath();
                ctx.arc(920, 200, 110, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(img, 810, 90, 220, 220);
                ctx.restore();
                // Border ring
                ctx.strokeStyle = "#3a3028";
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.arc(920, 200, 110, 0, Math.PI * 2);
                ctx.stroke();
                drawRest();
            };
            img.src = photo;
        } else {
            // Placeholder circle
            ctx.beginPath();
            ctx.arc(920, 200, 110, 0, Math.PI * 2);
            ctx.fillStyle = "#e0d4c0";
            ctx.fill();
            ctx.font = "80px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("👤", 920, 230);
            ctx.textAlign = "left";
            drawRest();
        }
    }, []);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.download = `workout-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const handleWhatsApp = () => {
        const msg = encodeURIComponent(
            `💪 Workout done!\n${name} · Week ${selectedWeek + 1}\n🔥 ${streaks.current} day streak · ✅ ${done} sessions completed\n\n#FitnessJourney #FormAndStrength`
        );
        window.open(`https://wa.me/?text=${msg}`, "_blank");
    };

    return (
        <div style={styles.app}>
            <div style={styles.container}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                    <button style={{ ...styles.btnOutline, padding: "8px 16px" }} onClick={onBack}>← Back</button>
                    <h2 style={{ ...styles.heading, fontSize: "26px", fontWeight: "300", margin: 0 }}>Share</h2>
                </div>

                {/* Canvas preview (scaled down) */}
                <div style={{ background: "#e0d8cc", borderRadius: "20px", padding: "16px", marginBottom: "20px", overflow: "hidden" }}>
                    <canvas
                        ref={canvasRef}
                        style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }}
                    />
                </div>

                <p style={{ fontSize: "12px", color: "#8b7355", textAlign: "center", marginBottom: "20px", fontStyle: "italic" }}>
                    Your 1080×1080 Instagram card is ready ✨
                </p>

                {/* Action Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <button style={{ ...styles.btn, width: "100%", padding: "16px", fontSize: "14px" }} onClick={handleDownload}>
                        📥 Download Image (Instagram)
                    </button>
                    <button
                        style={{ ...styles.btn, width: "100%", padding: "16px", fontSize: "14px", background: "#25D366" }}
                        onClick={handleWhatsApp}
                    >
                        💬 Share on WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareView;
