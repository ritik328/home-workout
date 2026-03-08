// ─── EXERCISE SVG ANIMATIONS (inline, no external deps) ──────────────────────
const ExerciseSVG = ({ name, style = {} }) => {
    const svgs = {
        "Glute Bridge": (
            <svg viewBox="0 0 200 140" style={style}>
                <defs>
                    <style>{`
            @keyframes bridgeHips {
              0%,100%{transform:translateY(0)}
              50%{transform:translateY(-18px)}
            }
            .hips-g{animation:bridgeHips 2s ease-in-out infinite;transform-origin:100px 90px}
          `}</style>
                </defs>
                {/* Floor */}
                <rect x="10" y="115" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4" />
                {/* Body lying down */}
                <g className="hips-g">
                    {/* Upper back */}
                    <ellipse cx="60" cy="110" rx="22" ry="10" fill="#8b7355" opacity="0.8" />
                    {/* Hips raised */}
                    <ellipse cx="100" cy="92" rx="20" ry="12" fill="#6b5a3e" />
                    {/* Thighs */}
                    <line x1="100" y1="100" x2="130" y2="115" stroke="#8b7355" strokeWidth="14" strokeLinecap="round" />
                    {/* Feet */}
                    <ellipse cx="140" cy="115" rx="14" ry="7" fill="#8b7355" opacity="0.9" />
                    {/* Arms */}
                    <line x1="60" y1="110" x2="40" y2="115" stroke="#8b7355" strokeWidth="10" strokeLinecap="round" />
                    <line x1="60" y1="110" x2="80" y2="115" stroke="#8b7355" strokeWidth="10" strokeLinecap="round" />
                    {/* Head */}
                    <circle cx="38" cy="107" r="10" fill="#a08060" />
                </g>
                <text x="100" y="30" textAnchor="middle" fill="#a08060" fontSize="10" opacity="0.7">↑ Lift hips up</text>
            </svg>
        ),
        "Bodyweight Squat": (
            <svg viewBox="0 0 200 160" style={style}>
                <defs>
                    <style>{`
            @keyframes squat {
              0%,100%{transform:translateY(0) scaleY(1)}
              50%{transform:translateY(20px) scaleY(0.8)}
            }
            .squat-body{animation:squat 2s ease-in-out infinite;transform-origin:100px 80px}
          `}</style>
                </defs>
                <rect x="10" y="145" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4" />
                <g className="squat-body">
                    <circle cx="100" cy="30" r="13" fill="#a08060" />
                    <rect x="86" y="42" width="28" height="40" rx="8" fill="#7a6045" />
                    <line x1="100" y1="80" x2="80" y2="130" stroke="#7a6045" strokeWidth="13" strokeLinecap="round" />
                    <line x1="100" y1="80" x2="120" y2="130" stroke="#7a6045" strokeWidth="13" strokeLinecap="round" />
                    <ellipse cx="80" cy="132" rx="12" ry="6" fill="#7a6045" />
                    <ellipse cx="120" cy="132" rx="12" ry="6" fill="#7a6045" />
                    <line x1="90" y1="58" x2="60" y2="75" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                    <line x1="110" y1="58" x2="140" y2="75" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                </g>
                <text x="100" y="155" textAnchor="middle" fill="#a08060" fontSize="9" opacity="0.7">Sit back & down</text>
            </svg>
        ),
        "Donkey Kick": (
            <svg viewBox="0 0 200 150" style={style}>
                <defs>
                    <style>{`
            @keyframes donkey {
              0%,100%{transform:rotate(0deg)}
              50%{transform:rotate(-35deg)}
            }
            .dk-leg{animation:donkey 2s ease-in-out infinite;transform-origin:100px 80px}
          `}</style>
                </defs>
                <rect x="10" y="130" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4" />
                <circle cx="55" cy="65" r="12" fill="#a08060" />
                <rect x="62" y="70" width="60" height="22" rx="8" fill="#7a6045" />
                <line x1="70" y1="88" x2="50" y2="115" stroke="#7a6045" strokeWidth="11" strokeLinecap="round" />
                <line x1="82" y1="90" x2="82" y2="118" stroke="#7a6045" strokeWidth="11" strokeLinecap="round" />
                <line x1="110" y1="88" x2="110" y2="118" stroke="#7a6045" strokeWidth="11" strokeLinecap="round" />
                <g className="dk-leg">
                    <line x1="122" y1="88" x2="155" y2="88" stroke="#8b6a40" strokeWidth="11" strokeLinecap="round" />
                    <ellipse cx="163" cy="88" rx="10" ry="7" fill="#8b6a40" />
                </g>
                <text x="100" y="144" textAnchor="middle" fill="#a08060" fontSize="9" opacity="0.7">Kick leg back & up</text>
            </svg>
        ),
        "Plank": (
            <svg viewBox="0 0 200 130" style={style}>
                <defs>
                    <style>{`
            @keyframes plankPulse {
              0%,100%{opacity:0.9}
              50%{opacity:1}
            }
            .plank-body{animation:plankPulse 2s ease-in-out infinite}
          `}</style>
                </defs>
                <rect x="10" y="110" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4" />
                <g className="plank-body">
                    <circle cx="155" cy="62" r="12" fill="#a08060" />
                    <rect x="55" y="72" width="100" height="20" rx="8" fill="#7a6045" />
                    <line x1="60" y1="90" x2="55" y2="110" stroke="#7a6045" strokeWidth="11" strokeLinecap="round" />
                    <line x1="150" y1="90" x2="150" y2="110" stroke="#7a6045" strokeWidth="11" strokeLinecap="round" />
                    <line x1="70" y1="76" x2="50" y2="100" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                    <ellipse cx="47" cy="104" rx="11" ry="6" fill="#7a6045" />
                </g>
                <text x="100" y="125" textAnchor="middle" fill="#a08060" fontSize="9" opacity="0.7">Hold straight & strong</text>
            </svg>
        ),
        "Push-Up": (
            <svg viewBox="0 0 200 140" style={style}>
                <defs>
                    <style>{`
            @keyframes pushup {
              0%,100%{transform:translateY(0)}
              50%{transform:translateY(-16px)}
            }
            .pu-body{animation:pushup 2s ease-in-out infinite;transform-origin:100px 85px}
          `}</style>
                </defs>
                <rect x="10" y="120" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4" />
                <g className="pu-body">
                    <circle cx="150" cy="72" r="12" fill="#a08060" />
                    <rect x="55" y="80" width="95" height="18" rx="8" fill="#7a6045" />
                    <line x1="60" y1="95" x2="55" y2="118" stroke="#7a6045" strokeWidth="11" strokeLinecap="round" />
                    <line x1="145" y1="95" x2="145" y2="118" stroke="#7a6045" strokeWidth="11" strokeLinecap="round" />
                    <line x1="70" y1="84" x2="42" y2="108" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                    <line x1="82" y1="84" x2="82" y2="110" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                </g>
                <text x="100" y="134" textAnchor="middle" fill="#a08060" fontSize="9" opacity="0.7">Lower chest to ground</text>
            </svg>
        ),
        "Cat-Cow Stretch": (
            <svg viewBox="0 0 200 150" style={style}>
                <defs>
                    <style>{`
            @keyframes spineAnim {
              0%,100%{transform:translateY(-5px)}
              50%{transform:translateY(8px)}
            }
            .spine{animation:spineAnim 2s ease-in-out infinite;transform-origin:100px 80px}
          `}</style>
                </defs>
                <rect x="10" y="128" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4" />
                <circle cx="55" cy="70" r="11" fill="#a08060" />
                <g className="spine">
                    <rect x="62" y="75" width="72" height="18" rx="9" fill="#7a6045" />
                </g>
                <line x1="70" y1="90" x2="58" y2="118" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                <line x1="82" y1="92" x2="82" y2="120" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                <line x1="118" y1="92" x2="118" y2="120" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                <line x1="130" y1="90" x2="142" y2="118" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                <text x="100" y="142" textAnchor="middle" fill="#a08060" fontSize="9" opacity="0.7">Arch & round spine</text>
            </svg>
        ),
        "default": (
            <svg viewBox="0 0 200 150" style={style}>
                <defs>
                    <style>{`
            @keyframes pulse {
              0%,100%{transform:scale(1);opacity:0.8}
              50%{transform:scale(1.05);opacity:1}
            }
            .fig{animation:pulse 2s ease-in-out infinite;transform-origin:100px 75px}
          `}</style>
                </defs>
                <rect x="10" y="128" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4" />
                <g className="fig">
                    <circle cx="100" cy="35" r="15" fill="#a08060" />
                    <rect x="85" y="49" width="30" height="42" rx="9" fill="#7a6045" />
                    <line x1="100" y1="88" x2="78" y2="125" stroke="#7a6045" strokeWidth="13" strokeLinecap="round" />
                    <line x1="100" y1="88" x2="122" y2="125" stroke="#7a6045" strokeWidth="13" strokeLinecap="round" />
                    <line x1="90" y1="62" x2="66" y2="82" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                    <line x1="110" y1="62" x2="134" y2="82" stroke="#7a6045" strokeWidth="10" strokeLinecap="round" />
                </g>
            </svg>
        ),
    };
    return svgs[name] || svgs["default"];
};

export default ExerciseSVG;
