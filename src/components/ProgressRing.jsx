import { useEffect, useRef } from "react";
import { C } from "./styles";

// ─── PROGRESS RING ──────────────────────────────────────────────────────────
// SVG circle ring that animates itself drawing clockwise on mount
// value: 0.0 → 1.0
const ProgressRing = ({ value = 0, size = 100, stroke = 5, color = C.accent, trackColor = C.border, children }) => {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - Math.min(1, Math.max(0, value)));
    const circleRef = useRef(null);

    useEffect(() => {
        const el = circleRef.current;
        if (!el) return;
        // Set the final offset via CSS custom property for the animation
        el.style.setProperty("--ring-target", offset);
        // Trigger re-animation if value changes
        el.style.strokeDashoffset = circumference;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.transition = "stroke-dashoffset 1.2s ease";
                el.style.strokeDashoffset = offset;
            });
        });
    }, [value, circumference, offset]);

    return (
        <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                {/* Track */}
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={trackColor} strokeWidth={stroke}
                />
                {/* Fill */}
                <circle
                    ref={circleRef}
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                />
            </svg>
            {/* Centered content (timer number, etc.) */}
            <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
            }}>
                {children}
            </div>
        </div>
    );
};

export default ProgressRing;
