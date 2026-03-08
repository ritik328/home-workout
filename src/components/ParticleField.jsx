import { useEffect, useRef } from "react";

// ─── PARTICLE FIELD ─────────────────────────────────────────────────────────
// Tiny gold ember dots drifting upward continuously
const ParticleField = ({ count = 55, intense = false }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Initialise particles
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.4,
            speed: Math.random() * 0.4 + (intense ? 0.5 : 0.15),
            alpha: Math.random() * 0.6 + 0.1,
            drift: (Math.random() - 0.5) * 0.3,
        }));

        let rafId;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 169, 110, ${p.alpha})`;
                ctx.fill();

                // drift upward
                p.y -= p.speed;
                p.x += p.drift;
                p.alpha += (Math.random() - 0.5) * 0.02;
                p.alpha = Math.max(0.05, Math.min(0.8, p.alpha));

                // reset to bottom when off screen
                if (p.y < -4) {
                    p.y = canvas.height + 4;
                    p.x = Math.random() * canvas.width;
                }
            });
            rafId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafId);
        };
    }, [count, intense]);

    return (
        <canvas
            ref={canvasRef}
            className="particle-canvas"
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default ParticleField;
