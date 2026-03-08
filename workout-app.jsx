import { useState, useEffect, useRef } from "react";

// ─── FONT IMPORTS ───────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ─── EXERCISE ANIMATIONS (SVG-based animated GIF URLs from public sources) ──
const EXERCISE_GIFS = {
  "Glute Bridge": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Bodyweight Squat": "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
  "Modified Push-Up": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "Bird Dog": "https://media.giphy.com/media/3o7TKMvFXyHgE4bDQk/giphy.gif",
  "Hip Circle": "https://media.giphy.com/media/3oz8xUK8V7suY7W9SE/giphy.gif",
  "Cat-Cow Stretch": "https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif",
  "Child's Pose": "https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif",
  "Downward Dog": "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
  "Wall Sit": "https://media.giphy.com/media/3o7TKMvFXyHgE4bDQk/giphy.gif",
  "Lunge": "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
  "Plank": "https://media.giphy.com/media/3oz8xUK8V7suY7W9SE/giphy.gif",
  "Sit-Up": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Superman": "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
  "Mountain Climber": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "Jump Squat": "https://media.giphy.com/media/3oz8xUK8V7suY7W9SE/giphy.gif",
  "Hip Thrust": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Bulgarian Split Squat": "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
  "Donkey Kick": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Fire Hydrant": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Side Lunge": "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
  "Tricep Dip": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "Chest Press": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "Butterfly Stretch": "https://media.giphy.com/media/3o7TKMvFXyHgE4bDQk/giphy.gif",
  "Neck Roll": "https://media.giphy.com/media/3oz8xUK8V7suY7W9SE/giphy.gif",
  "Shoulder Stretch": "https://media.giphy.com/media/3o7TKMvFXyHgE4bDQk/giphy.gif",
  "Knee Hug": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Seated Twist": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Cobra Pose": "https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif",
  "Warrior I": "https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif",
  "Warrior II": "https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif",
  "Bridge Pose": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Legs Up Wall": "https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif",
  "Pigeon Pose": "https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif",
  "Sumo Squat": "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
  "Bicycle Crunch": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Reverse Lunge": "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
  "Glute Kickback": "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
  "Calf Raise": "https://media.giphy.com/media/3oz8xUK8V7suY7W9SE/giphy.gif",
  "Inner Thigh Squeeze": "https://media.giphy.com/media/3o7TKMvFXyHgE4bDQk/giphy.gif",
  "Dead Bug": "https://media.giphy.com/media/3o7TKMvFXyHgE4bDQk/giphy.gif",
  "Push-Up": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "Side Plank": "https://media.giphy.com/media/3oz8xUK8V7suY7W9SE/giphy.gif",
  "Romanian Deadlift": "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
};

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
            @keyframes bridgeFade {
              0%,100%{opacity:0.4}
              50%{opacity:1}
            }
            .hips-g{animation:bridgeHips 2s ease-in-out infinite;transform-origin:100px 90px}
          `}</style>
        </defs>
        {/* Floor */}
        <rect x="10" y="115" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4"/>
        {/* Body lying down */}
        <g className="hips-g">
          {/* Upper back */}
          <ellipse cx="60" cy="110" rx="22" ry="10" fill="#8b7355" opacity="0.8"/>
          {/* Hips raised */}
          <ellipse cx="100" cy="92" rx="20" ry="12" fill="#6b5a3e"/>
          {/* Thighs */}
          <line x1="100" y1="100" x2="130" y2="115" stroke="#8b7355" strokeWidth="14" strokeLinecap="round"/>
          {/* Feet */}
          <ellipse cx="140" cy="115" rx="14" ry="7" fill="#8b7355" opacity="0.9"/>
          {/* Arms */}
          <line x1="60" y1="110" x2="40" y2="115" stroke="#8b7355" strokeWidth="10" strokeLinecap="round"/>
          <line x1="60" y1="110" x2="80" y2="115" stroke="#8b7355" strokeWidth="10" strokeLinecap="round"/>
          {/* Head */}
          <circle cx="38" cy="107" r="10" fill="#a08060"/>
        </g>
        {/* Arrow hint */}
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
        <rect x="10" y="145" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4"/>
        <g className="squat-body">
          <circle cx="100" cy="30" r="13" fill="#a08060"/>
          <rect x="86" y="42" width="28" height="40" rx="8" fill="#7a6045"/>
          <line x1="100" y1="80" x2="80" y2="130" stroke="#7a6045" strokeWidth="13" strokeLinecap="round"/>
          <line x1="100" y1="80" x2="120" y2="130" stroke="#7a6045" strokeWidth="13" strokeLinecap="round"/>
          <ellipse cx="80" cy="132" rx="12" ry="6" fill="#7a6045"/>
          <ellipse cx="120" cy="132" rx="12" ry="6" fill="#7a6045"/>
          <line x1="90" y1="58" x2="60" y2="75" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
          <line x1="110" y1="58" x2="140" y2="75" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
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
        <rect x="10" y="130" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4"/>
        {/* On all fours */}
        <circle cx="55" cy="65" r="12" fill="#a08060"/>
        <rect x="62" y="70" width="60" height="22" rx="8" fill="#7a6045"/>
        {/* Arms */}
        <line x1="70" y1="88" x2="50" y2="115" stroke="#7a6045" strokeWidth="11" strokeLinecap="round"/>
        <line x1="82" y1="90" x2="82" y2="118" stroke="#7a6045" strokeWidth="11" strokeLinecap="round"/>
        {/* Static leg */}
        <line x1="110" y1="88" x2="110" y2="118" stroke="#7a6045" strokeWidth="11" strokeLinecap="round"/>
        {/* Kicking leg */}
        <g className="dk-leg">
          <line x1="122" y1="88" x2="155" y2="88" stroke="#8b6a40" strokeWidth="11" strokeLinecap="round"/>
          <ellipse cx="163" cy="88" rx="10" ry="7" fill="#8b6a40"/>
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
        <rect x="10" y="110" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4"/>
        <g className="plank-body">
          <circle cx="155" cy="62" r="12" fill="#a08060"/>
          <rect x="55" y="72" width="100" height="20" rx="8" fill="#7a6045"/>
          <line x1="60" y1="90" x2="55" y2="110" stroke="#7a6045" strokeWidth="11" strokeLinecap="round"/>
          <line x1="150" y1="90" x2="150" y2="110" stroke="#7a6045" strokeWidth="11" strokeLinecap="round"/>
          <line x1="70" y1="76" x2="50" y2="100" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
          <ellipse cx="47" cy="104" rx="11" ry="6" fill="#7a6045"/>
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
        <rect x="10" y="120" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4"/>
        <g className="pu-body">
          <circle cx="150" cy="72" r="12" fill="#a08060"/>
          <rect x="55" y="80" width="95" height="18" rx="8" fill="#7a6045"/>
          <line x1="60" y1="95" x2="55" y2="118" stroke="#7a6045" strokeWidth="11" strokeLinecap="round"/>
          <line x1="145" y1="95" x2="145" y2="118" stroke="#7a6045" strokeWidth="11" strokeLinecap="round"/>
          <line x1="70" y1="84" x2="42" y2="108" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
          <line x1="82" y1="84" x2="82" y2="110" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
        </g>
        <text x="100" y="134" textAnchor="middle" fill="#a08060" fontSize="9" opacity="0.7">Lower chest to ground</text>
      </svg>
    ),
    "Cat-Cow Stretch": (
      <svg viewBox="0 0 200 150" style={style}>
        <defs>
          <style>{`
            @keyframes catcow {
              0%,100%{d:path("M 60 80 Q 100 65 140 80")}
              50%{d:path("M 60 80 Q 100 95 140 80")}
            }
            @keyframes spineAnim {
              0%,100%{transform:translateY(-5px)}
              50%{transform:translateY(8px)}
            }
            .spine{animation:spineAnim 2s ease-in-out infinite;transform-origin:100px 80px}
          `}</style>
        </defs>
        <rect x="10" y="128" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4"/>
        <circle cx="55" cy="70" r="11" fill="#a08060"/>
        <g className="spine">
          <rect x="62" y="75" width="72" height="18" rx="9" fill="#7a6045"/>
        </g>
        <line x1="70" y1="90" x2="58" y2="118" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
        <line x1="82" y1="92" x2="82" y2="120" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
        <line x1="118" y1="92" x2="118" y2="120" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
        <line x1="130" y1="90" x2="142" y2="118" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
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
        <rect x="10" y="128" width="180" height="4" rx="2" fill="#c8b8a2" opacity="0.4"/>
        <g className="fig">
          <circle cx="100" cy="35" r="15" fill="#a08060"/>
          <rect x="85" y="49" width="30" height="42" rx="9" fill="#7a6045"/>
          <line x1="100" y1="88" x2="78" y2="125" stroke="#7a6045" strokeWidth="13" strokeLinecap="round"/>
          <line x1="100" y1="88" x2="122" y2="125" stroke="#7a6045" strokeWidth="13" strokeLinecap="round"/>
          <line x1="90" y1="62" x2="66" y2="82" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
          <line x1="110" y1="62" x2="134" y2="82" stroke="#7a6045" strokeWidth="10" strokeLinecap="round"/>
        </g>
      </svg>
    ),
  };
  return svgs[name] || svgs["default"];
};

// ─── 12-WEEK WORKOUT PROGRAM ──────────────────────────────────────────────────
const PROGRAM = {
  weeks: [
    // PHASE 1: Weeks 1–2 (Foundation)
    { week: 1, phase: "Foundation", theme: "Gentle Awakening", days: getDays(1) },
    { week: 2, phase: "Foundation", theme: "Building Awareness", days: getDays(2) },
    // PHASE 2: Weeks 3–6 (Build)
    { week: 3, phase: "Build", theme: "Strength Begins", days: getDays(3) },
    { week: 4, phase: "Build", theme: "Progressive Load", days: getDays(4) },
    { week: 5, phase: "Build", theme: "Power & Shape", days: getDays(5) },
    { week: 6, phase: "Build", theme: "Sculpting", days: getDays(6) },
    // PHASE 3: Weeks 7–12 (Transform)
    { week: 7, phase: "Transform", theme: "Intensify", days: getDays(7) },
    { week: 8, phase: "Transform", theme: "Peak Strength", days: getDays(8) },
    { week: 9, phase: "Transform", theme: "Full Power", days: getDays(9) },
    { week: 10, phase: "Transform", theme: "Elite Form", days: getDays(10) },
    { week: 11, phase: "Transform", theme: "Final Push", days: getDays(11) },
    { week: 12, phase: "Transform", theme: "Completion", days: getDays(12) },
  ]
};

function getDays(week) {
  const isEarly = week <= 2;
  const isMid = week >= 3 && week <= 6;

  const yogaDay = {
    label: "Sunday",
    type: "yoga",
    focus: "Recovery & Healing Yoga",
    color: "#d4c5a9",
    exercises: [
      { name: "Neck Roll", sets: "1", reps: "5 each side", time: 60, rest: 30, tip: "Gently relieves headache & shoulder tension", targets: "Neck, Shoulders" },
      { name: "Cat-Cow Stretch", sets: "1", reps: "10 slow", time: 90, rest: 20, tip: "Massages spine, improves digestion", targets: "Spine, Core" },
      { name: "Child's Pose", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Decompresses lower back, calms nervous system", targets: "Back, Hips" },
      { name: "Downward Dog", sets: "2", reps: "Hold 30s", time: 30, rest: 20, tip: "Relieves shoulder pain & headaches", targets: "Full Body" },
      { name: "Cobra Pose", sets: "2", reps: "Hold 20s", time: 20, rest: 20, tip: "Opens chest, improves posture & breast support", targets: "Chest, Back" },
      { name: "Warrior I", sets: "1", reps: "30s each", time: 30, rest: 20, tip: "Builds leg strength gently", targets: "Legs, Core" },
      { name: "Warrior II", sets: "1", reps: "30s each", time: 30, rest: 20, tip: "Tones thighs & arms", targets: "Thighs, Arms" },
      { name: "Seated Twist", sets: "1", reps: "5 each side", time: 60, rest: 20, tip: "Aids digestion, relieves back tension", targets: "Spine, Digestion" },
      { name: "Bridge Pose", sets: "2", reps: "Hold 20s", time: 20, rest: 20, tip: "Tones glutes, relieves lower back", targets: "Glutes, Back" },
      { name: "Legs Up Wall", sets: "1", reps: "Hold 3 mins", time: 180, rest: 0, tip: "Improves circulation, reduces leg pain & headaches", targets: "Full Body Recovery" },
      { name: "Pigeon Pose", sets: "1", reps: "60s each", time: 60, rest: 20, tip: "Deep hip & glute stretch", targets: "Hips, Glutes" },
    ]
  };

  if (isEarly) {
    return [
      { label: "Monday", type: "lower", focus: "Glutes & Legs — Foundation", color: "#b8a89a", exercises: [
        { name: "Glute Bridge", sets: "3", reps: "12", time: 30, rest: 45, tip: "Squeeze glutes at top. Helps with lower back pain.", targets: "Glutes, Hamstrings" },
        { name: "Bodyweight Squat", sets: "3", reps: "10", time: 30, rest: 45, tip: "Sit back like a chair. Knees over toes.", targets: "Quads, Glutes" },
        { name: "Donkey Kick", sets: "3", reps: "10 each", time: 30, rest: 40, tip: "Keep core tight. Best glute isolation.", targets: "Glutes" },
        { name: "Side Lunge", sets: "2", reps: "8 each", time: 25, rest: 40, tip: "Open hip, great for inner thighs.", targets: "Inner Thighs, Quads" },
        { name: "Calf Raise", sets: "3", reps: "15", time: 20, rest: 30, tip: "Relieves leg pain, tones calves.", targets: "Calves" },
        { name: "Cat-Cow Stretch", sets: "1", reps: "10 slow", time: 60, rest: 20, tip: "Cool down. Relieves back & digestion.", targets: "Spine" },
      ]},
      { label: "Tuesday", type: "upper", focus: "Chest & Arms — Foundation", color: "#a89898", exercises: [
        { name: "Modified Push-Up", sets: "3", reps: "8", time: 30, rest: 45, tip: "On knees is fine! Builds chest & arms.", targets: "Chest, Triceps" },
        { name: "Shoulder Stretch", sets: "1", reps: "5 each", time: 30, rest: 20, tip: "Relieves shoulder pain immediately.", targets: "Shoulders" },
        { name: "Tricep Dip", sets: "3", reps: "8", time: 25, rest: 40, tip: "Use chair. Tones back of arms.", targets: "Triceps" },
        { name: "Cobra Pose", sets: "2", reps: "Hold 20s", time: 20, rest: 20, tip: "Opens chest — helps posture & chest tone.", targets: "Chest, Back" },
        { name: "Dead Bug", sets: "2", reps: "8 each", time: 30, rest: 40, tip: "Core stability without back strain.", targets: "Core" },
      ]},
      { label: "Wednesday", type: "active-rest", focus: "Light Walk + Stretch", color: "#a8b89a", exercises: [
        { name: "Neck Roll", sets: "1", reps: "5 each side", time: 60, rest: 20, tip: "Relieves headache tension.", targets: "Neck" },
        { name: "Cat-Cow Stretch", sets: "1", reps: "10", time: 60, rest: 20, tip: "Aids digestion.", targets: "Spine" },
        { name: "Butterfly Stretch", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Hip & inner thigh opener.", targets: "Hips, Thighs" },
        { name: "Knee Hug", sets: "1", reps: "Hold 30s each", time: 30, rest: 20, tip: "Relieves lower back.", targets: "Back, Hips" },
      ]},
      { label: "Thursday", type: "glute", focus: "Glute Focus Day", color: "#b8a89a", exercises: [
        { name: "Hip Thrust", sets: "3", reps: "12", time: 30, rest: 45, tip: "Feet on floor, back on sofa. Best glute exercise!", targets: "Glutes, Hamstrings" },
        { name: "Fire Hydrant", sets: "3", reps: "10 each", time: 25, rest: 40, tip: "Tones outer glutes & hips.", targets: "Glutes, Hips" },
        { name: "Glute Kickback", sets: "3", reps: "12 each", time: 30, rest: 40, tip: "Squeeze at top!", targets: "Glutes" },
        { name: "Sumo Squat", sets: "3", reps: "12", time: 30, rest: 45, tip: "Wide stance = inner thighs + glutes.", targets: "Glutes, Inner Thighs" },
        { name: "Plank", sets: "2", reps: "Hold 20s", time: 20, rest: 30, tip: "Core strength supports spine.", targets: "Core" },
      ]},
      { label: "Friday", type: "full-body", focus: "Gentle Full Body", color: "#9898a8", exercises: [
        { name: "Bodyweight Squat", sets: "3", reps: "10", time: 30, rest: 45, tip: "Builds overall leg strength.", targets: "Quads, Glutes" },
        { name: "Modified Push-Up", sets: "3", reps: "8", time: 25, rest: 45, tip: "Chest + arms combo.", targets: "Chest, Triceps" },
        { name: "Glute Bridge", sets: "3", reps: "12", time: 30, rest: 40, tip: "Daily glute work for faster results.", targets: "Glutes" },
        { name: "Bird Dog", sets: "3", reps: "8 each", time: 25, rest: 40, tip: "Relieves back & shoulder pain.", targets: "Core, Back" },
        { name: "Seated Twist", sets: "1", reps: "8 each", time: 40, rest: 20, tip: "Aids digestion, cool-down.", targets: "Core, Digestion" },
      ]},
      { label: "Saturday", type: "rest", focus: "Full Rest", color: "#a8a898", exercises: [
        { name: "Knee Hug", sets: "1", reps: "Hold 30s each", time: 30, rest: 20, tip: "Gentle recovery stretch.", targets: "Back, Hips" },
        { name: "Butterfly Stretch", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Light recovery only today.", targets: "Hips" },
      ]},
      yogaDay,
    ];
  } else if (isMid) {
    return [
      { label: "Monday", type: "glute-power", focus: "Glutes & Strength Power", color: "#b8a89a", exercises: [
        { name: "Hip Thrust", sets: "4", reps: "15", time: 35, rest: 45, tip: "Add weight (water bottle). Squeeze hard at top!", targets: "Glutes, Hamstrings" },
        { name: "Bulgarian Split Squat", sets: "3", reps: "10 each", time: 35, rest: 50, tip: "Back foot on sofa. Deep lunge builds strong glutes!", targets: "Glutes, Quads" },
        { name: "Sumo Squat", sets: "4", reps: "15", time: 30, rest: 45, tip: "Wide stance, deep. Inner thighs + glutes.", targets: "Glutes, Inner Thighs" },
        { name: "Donkey Kick", sets: "3", reps: "15 each", time: 30, rest: 40, tip: "Add ankle weight if possible.", targets: "Glutes" },
        { name: "Romanian Deadlift", sets: "3", reps: "12", time: 30, rest: 45, tip: "Hinge at hips. Feel the hamstring stretch.", targets: "Glutes, Hamstrings" },
        { name: "Calf Raise", sets: "3", reps: "20", time: 20, rest: 30, tip: "Single leg for more challenge.", targets: "Calves" },
      ]},
      { label: "Tuesday", type: "chest-arms", focus: "Chest, Arms & Posture", color: "#a89898", exercises: [
        { name: "Push-Up", sets: "4", reps: "10", time: 30, rest: 45, tip: "Full push-up now. Builds chest fullness.", targets: "Chest, Triceps" },
        { name: "Chest Press", sets: "3", reps: "12", time: 30, rest: 45, tip: "Use water bottles. Presses build chest.", targets: "Chest, Shoulders" },
        { name: "Tricep Dip", sets: "3", reps: "12", time: 25, rest: 40, tip: "Tones back of arms.", targets: "Triceps" },
        { name: "Shoulder Stretch", sets: "2", reps: "5 each", time: 30, rest: 20, tip: "Relieves shoulder pain.", targets: "Shoulders" },
        { name: "Plank", sets: "3", reps: "Hold 30s", time: 30, rest: 35, tip: "Hold longer each week.", targets: "Core" },
        { name: "Dead Bug", sets: "3", reps: "10 each", time: 30, rest: 35, tip: "Core supports chest posture.", targets: "Core" },
      ]},
      { label: "Wednesday", type: "legs-thighs", focus: "Legs & Inner Thighs", color: "#a8b89a", exercises: [
        { name: "Lunge", sets: "4", reps: "12 each", time: 30, rest: 45, tip: "Forward lunge with good form.", targets: "Quads, Glutes" },
        { name: "Side Lunge", sets: "3", reps: "12 each", time: 30, rest: 40, tip: "Inner thigh toner.", targets: "Inner Thighs" },
        { name: "Wall Sit", sets: "3", reps: "Hold 30s", time: 30, rest: 45, tip: "Builds quads without back strain.", targets: "Quads" },
        { name: "Inner Thigh Squeeze", sets: "3", reps: "20", time: 20, rest: 30, tip: "Use pillow between knees.", targets: "Inner Thighs" },
        { name: "Calf Raise", sets: "3", reps: "20", time: 20, rest: 30, tip: "Relieves leg heaviness.", targets: "Calves" },
      ]},
      { label: "Thursday", type: "full-strength", focus: "Full Body Strength", color: "#9898a8", exercises: [
        { name: "Bodyweight Squat", sets: "4", reps: "15", time: 30, rest: 40, tip: "Deep and controlled.", targets: "Quads, Glutes" },
        { name: "Push-Up", sets: "4", reps: "10", time: 30, rest: 45, tip: "Chest strength day.", targets: "Chest" },
        { name: "Glute Bridge", sets: "4", reps: "20", time: 30, rest: 40, tip: "Daily glute activation.", targets: "Glutes" },
        { name: "Bird Dog", sets: "3", reps: "12 each", time: 30, rest: 35, tip: "Spine health + core.", targets: "Core, Back" },
        { name: "Bicycle Crunch", sets: "3", reps: "20", time: 30, rest: 35, tip: "Flat belly & waist.", targets: "Core, Obliques" },
        { name: "Mountain Climber", sets: "3", reps: "20", time: 30, rest: 40, tip: "Cardio + core combo.", targets: "Core, Full Body" },
      ]},
      { label: "Friday", type: "glute-sculpt", focus: "Glute Sculpt & Thighs", color: "#b8a89a", exercises: [
        { name: "Hip Thrust", sets: "4", reps: "15", time: 35, rest: 45, tip: "Focus: squeeze each rep!", targets: "Glutes" },
        { name: "Reverse Lunge", sets: "3", reps: "12 each", time: 30, rest: 45, tip: "More glute emphasis than forward lunge.", targets: "Glutes, Quads" },
        { name: "Fire Hydrant", sets: "3", reps: "15 each", time: 30, rest: 35, tip: "Outer glute & hip toner.", targets: "Glutes, Hips" },
        { name: "Sumo Squat", sets: "3", reps: "15", time: 30, rest: 40, tip: "Inner thigh burn.", targets: "Inner Thighs, Glutes" },
        { name: "Glute Kickback", sets: "3", reps: "15 each", time: 30, rest: 35, tip: "Finish strong!", targets: "Glutes" },
      ]},
      { label: "Saturday", type: "active-rest", focus: "Stretch & Walk", color: "#a8a898", exercises: [
        { name: "Cat-Cow Stretch", sets: "1", reps: "10", time: 60, rest: 20, tip: "Digestion + spine care.", targets: "Spine, Digestion" },
        { name: "Butterfly Stretch", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Hip flexor recovery.", targets: "Hips, Inner Thighs" },
        { name: "Child's Pose", sets: "1", reps: "Hold 60s", time: 60, rest: 20, tip: "Full recovery.", targets: "Back, Hips" },
      ]},
      yogaDay,
    ];
  } else {
    // Advanced weeks 7–12
    return [
      { label: "Monday", type: "glute-power", focus: "Advanced Glute Power", color: "#b8a89a", exercises: [
        { name: "Hip Thrust", sets: "5", reps: "20", time: 40, rest: 45, tip: "Add heavy weight. Best glute builder!", targets: "Glutes" },
        { name: "Bulgarian Split Squat", sets: "4", reps: "12 each", time: 40, rest: 50, tip: "Deep range. Feel the glute stretch.", targets: "Glutes, Quads" },
        { name: "Jump Squat", sets: "3", reps: "15", time: 30, rest: 45, tip: "Land softly. Power = results.", targets: "Glutes, Quads, Cardio" },
        { name: "Romanian Deadlift", sets: "4", reps: "15", time: 35, rest: 45, tip: "Full hip hinge.", targets: "Glutes, Hamstrings" },
        { name: "Donkey Kick", sets: "4", reps: "20 each", time: 30, rest: 35, tip: "Maximum glute burn.", targets: "Glutes" },
        { name: "Side Plank", sets: "3", reps: "Hold 30s", time: 30, rest: 35, tip: "Core + hip stabilizer.", targets: "Core, Hips" },
      ]},
      { label: "Tuesday", type: "chest-arms", focus: "Chest & Arms Advanced", color: "#a89898", exercises: [
        { name: "Push-Up", sets: "5", reps: "15", time: 30, rest: 40, tip: "Full range, slow eccentric.", targets: "Chest, Triceps" },
        { name: "Chest Press", sets: "4", reps: "15", time: 30, rest: 40, tip: "Heavy bottles for resistance.", targets: "Chest" },
        { name: "Tricep Dip", sets: "4", reps: "15", time: 25, rest: 40, tip: "Full dip depth.", targets: "Triceps" },
        { name: "Plank", sets: "4", reps: "Hold 45s", time: 45, rest: 30, tip: "Supports chest posture.", targets: "Core" },
        { name: "Mountain Climber", sets: "3", reps: "30", time: 30, rest: 40, tip: "Fast pace for cardio effect.", targets: "Core, Cardio" },
      ]},
      { label: "Wednesday", type: "legs", focus: "Thighs & Legs Advanced", color: "#a8b89a", exercises: [
        { name: "Bulgarian Split Squat", sets: "4", reps: "15 each", time: 40, rest: 50, tip: "Heaviest set of the week.", targets: "Quads, Glutes" },
        { name: "Jump Squat", sets: "4", reps: "15", time: 30, rest: 45, tip: "Explosive power.", targets: "Legs, Cardio" },
        { name: "Wall Sit", sets: "4", reps: "Hold 45s", time: 45, rest: 40, tip: "Endurance builder.", targets: "Quads" },
        { name: "Side Lunge", sets: "4", reps: "15 each", time: 30, rest: 40, tip: "Inner thigh sculptor.", targets: "Inner Thighs" },
        { name: "Calf Raise", sets: "4", reps: "25", time: 20, rest: 25, tip: "Single leg variation.", targets: "Calves" },
      ]},
      { label: "Thursday", type: "full-body", focus: "Peak Full Body", color: "#9898a8", exercises: [
        { name: "Jump Squat", sets: "4", reps: "15", time: 30, rest: 45, tip: "Explosive start!", targets: "Full Body" },
        { name: "Push-Up", sets: "4", reps: "15", time: 30, rest: 40, tip: "Chest day repeat.", targets: "Chest, Arms" },
        { name: "Romanian Deadlift", sets: "4", reps: "15", time: 35, rest: 45, tip: "Hamstrings & glutes.", targets: "Posterior Chain" },
        { name: "Bicycle Crunch", sets: "4", reps: "30", time: 30, rest: 35, tip: "Waist definition.", targets: "Core, Obliques" },
        { name: "Mountain Climber", sets: "4", reps: "30", time: 30, rest: 35, tip: "Cardio finisher.", targets: "Core, Cardio" },
        { name: "Plank", sets: "3", reps: "Hold 60s", time: 60, rest: 30, tip: "Finishing strong!", targets: "Core" },
      ]},
      { label: "Friday", type: "glute-sculpt", focus: "Glute Sculpture Day", color: "#b8a89a", exercises: [
        { name: "Hip Thrust", sets: "5", reps: "20", time: 40, rest: 45, tip: "MAXIMUM glute day!", targets: "Glutes" },
        { name: "Donkey Kick", sets: "4", reps: "20 each", time: 30, rest: 35, tip: "Slow and squeeze.", targets: "Glutes" },
        { name: "Fire Hydrant", sets: "4", reps: "20 each", time: 30, rest: 35, tip: "Outer glute burn.", targets: "Glutes, Hips" },
        { name: "Sumo Squat", sets: "4", reps: "20", time: 30, rest: 40, tip: "Inner thigh + glutes.", targets: "Inner Thighs, Glutes" },
        { name: "Glute Bridge", sets: "4", reps: "25", time: 30, rest: 35, tip: "Pump finish!", targets: "Glutes" },
      ]},
      { label: "Saturday", type: "cardio-core", focus: "Core & Light Cardio", color: "#a8a898", exercises: [
        { name: "Mountain Climber", sets: "3", reps: "30", time: 30, rest: 40, tip: "Fat burning.", targets: "Core, Cardio" },
        { name: "Bicycle Crunch", sets: "3", reps: "25", time: 30, rest: 35, tip: "Waist & abs.", targets: "Core" },
        { name: "Side Plank", sets: "3", reps: "Hold 30s each", time: 30, rest: 30, tip: "Oblique definition.", targets: "Obliques" },
        { name: "Cat-Cow Stretch", sets: "1", reps: "10", time: 60, rest: 20, tip: "Recovery.", targets: "Spine" },
      ]},
      yogaDay,
    ];
  }
}

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

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home"); // home | program | workout | exercise
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [phase, setPhase] = useState("exercise"); // exercise | rest
  const [completedExercises, setCompletedExercises] = useState({});
  const [isResting, setIsResting] = useState(false);

  const week = PROGRAM.weeks[selectedWeek];
  const day = selectedDay !== null ? week?.days[selectedDay] : null;
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

  const progressPercent = day ? Math.round(((currentExerciseIdx) / day.exercises.length) * 100) : 0;

  const typeIcon = (type) => {
    const icons = { glute: "🍑", lower: "🦵", upper: "💪", "full-body": "⚡", yoga: "🧘", rest: "💤", "active-rest": "🚶", "glute-power": "🔥", "chest-arms": "💪", legs: "🦵", "glute-sculpt": "🍑", "legs-thighs": "🦵", "full-strength": "⚡", "cardio-core": "🌊" };
    return icons[type] || "✨";
  };

  const styles = {
    app: { fontFamily: "'Jost', sans-serif", background: "#f5f0e8", minHeight: "100vh", color: "#3a3028" },
    heading: { fontFamily: "'Cormorant Garamond', serif" },
    card: { background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)", borderRadius: "16px", padding: "20px", marginBottom: "12px", border: "1px solid rgba(200,185,165,0.3)" },
    btn: { background: "#3a3028", color: "#f5f0e8", border: "none", borderRadius: "50px", padding: "12px 28px", fontFamily: "'Jost', sans-serif", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" },
    btnOutline: { background: "transparent", color: "#3a3028", border: "1px solid #3a3028", borderRadius: "50px", padding: "10px 22px", fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" },
    tag: (color) => ({ background: color + "33", color: "#3a3028", borderRadius: "20px", padding: "3px 12px", fontSize: "11px", letterSpacing: "1px", display: "inline-block" }),
    timerCircle: { width: "160px", height: "160px", borderRadius: "50%", border: "3px solid #3a3028", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "0 auto" },
  };

  // ── HOME VIEW ────────────────────────────────────────────────────────────────
  if (view === "home") {
    return (
      <div style={styles.app}>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 20px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#8b7355", marginBottom: "8px" }}>Your Personal Journey</p>
            <h1 style={{ ...styles.heading, fontSize: "42px", fontWeight: "300", lineHeight: 1.2, margin: "0 0 8px" }}>
              Form &<br /><em>Strength</em>
            </h1>
            <p style={{ fontSize: "13px", color: "#8b7355", letterSpacing: "1px" }}>12 weeks · At home · No equipment</p>
          </div>

          {/* Goal Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            {[
              { icon: "🍑", label: "Glute Lift", desc: "Sculpt & shape" },
              { icon: "💪", label: "Chest Tone", desc: "32 → 34 support" },
              { icon: "🦵", label: "Strong Thighs", desc: "Inner & outer" },
              { icon: "🧘", label: "Pain Relief", desc: "Head · Shoulder · Leg" },
            ].map(g => (
              <div key={g.label} style={{ ...styles.card, textAlign: "center", padding: "16px 12px" }}>
                <div style={{ fontSize: "24px", marginBottom: "6px" }}>{g.icon}</div>
                <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "2px" }}>{g.label}</div>
                <div style={{ fontSize: "11px", color: "#8b7355" }}>{g.desc}</div>
              </div>
            ))}
          </div>

          {/* Program info */}
          <div style={{ ...styles.card, marginBottom: "24px" }}>
            <p style={{ ...styles.heading, fontSize: "20px", fontWeight: "400", margin: "0 0 12px" }}>Program Overview</p>
            {[
              { phase: "Weeks 1–2", name: "Foundation", desc: "Gentle basics, learn form, no pressure" },
              { phase: "Weeks 3–6", name: "Build", desc: "Progressive load, shape begins" },
              { phase: "Weeks 7–12", name: "Transform", desc: "Full strength, sculpted results" },
            ].map(p => (
              <div key={p.phase} style={{ display: "flex", gap: "12px", marginBottom: "10px", alignItems: "flex-start" }}>
                <div style={{ width: "3px", background: "#3a3028", borderRadius: "2px", alignSelf: "stretch", flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: "11px", color: "#8b7355", letterSpacing: "1px" }}>{p.phase}</span>
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>{p.name}</div>
                  <div style={{ fontSize: "12px", color: "#8b7355" }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button style={styles.btn} onClick={() => setView("program")}>Begin Your Journey →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── PROGRAM VIEW (week selector) ─────────────────────────────────────────────
  if (view === "program") {
    return (
      <div style={styles.app}>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "24px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <button style={{ ...styles.btnOutline, padding: "8px 16px" }} onClick={() => setView("home")}>← Back</button>
            <div>
              <h2 style={{ ...styles.heading, fontSize: "28px", fontWeight: "300", margin: 0 }}>Your Program</h2>
              <p style={{ fontSize: "12px", color: "#8b7355", margin: 0, letterSpacing: "1px" }}>12 weeks · 6 days/week + Sunday Yoga</p>
            </div>
          </div>

          {["Foundation", "Build", "Transform"].map(phase => (
            <div key={phase} style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#8b7355", marginBottom: "10px" }}>{phase}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                {PROGRAM.weeks.filter(w => w.phase === phase).map(w => (
                  <button key={w.week} onClick={() => { setSelectedWeek(w.week - 1); setView("days"); }}
                    style={{ background: selectedWeek === w.week - 1 ? "#3a3028" : "rgba(255,255,255,0.6)", color: selectedWeek === w.week - 1 ? "#f5f0e8" : "#3a3028", border: "1px solid rgba(200,185,165,0.4)", borderRadius: "12px", padding: "14px 8px", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ ...styles.heading, fontSize: "20px", fontWeight: "300" }}>{w.week}</div>
                    <div style={{ fontSize: "10px", opacity: 0.7, marginTop: "2px" }}>Week</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── DAYS VIEW ────────────────────────────────────────────────────────────────
  if (view === "days") {
    return (
      <div style={styles.app}>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "24px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
            <button style={{ ...styles.btnOutline, padding: "8px 16px" }} onClick={() => setView("program")}>← Weeks</button>
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "3px", color: "#8b7355", margin: 0 }}>WEEK {week.week} · {week.phase}</p>
              <h2 style={{ ...styles.heading, fontSize: "26px", fontWeight: "300", margin: 0 }}>{week.theme}</h2>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            {week.days.map((d, i) => (
              <div key={i} style={{ ...styles.card, cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => { setSelectedDay(i); setCurrentExerciseIdx(0); setIsResting(false); setView("workout"); }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "20px" }}>{typeIcon(d.type)}</span>
                      <span style={{ fontSize: "11px", letterSpacing: "2px", color: "#8b7355", textTransform: "uppercase" }}>{d.label}</span>
                    </div>
                    <div style={{ ...styles.heading, fontSize: "18px", fontWeight: "400", marginBottom: "4px" }}>{d.focus}</div>
                    <div style={{ fontSize: "12px", color: "#8b7355" }}>{d.exercises.length} exercises · ~{Math.round(d.exercises.reduce((a, e) => a + (e.time * parseInt(e.sets || 1)) + (e.rest * parseInt(e.sets || 1)), 0) / 60)} min</div>
                  </div>
                  <div style={{ fontSize: "20px", color: "#8b7355" }}>→</div>
                </div>
                {completedExercises[`${selectedWeek}-${i}`] && (
                  <div style={{ marginTop: "8px", fontSize: "11px", color: "#8b7355", letterSpacing: "1px" }}>✓ Completed</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── WORKOUT VIEW ─────────────────────────────────────────────────────────────
  if (view === "workout" && day) {
    const handleNext = () => {
      if (currentExerciseIdx < day.exercises.length - 1) {
        const next = currentExerciseIdx + 1;
        setCurrentExerciseIdx(next);
        setIsResting(false);
        reset(day.exercises[next]?.time || 30);
      } else {
        setCompletedExercises(prev => ({ ...prev, [`${selectedWeek}-${selectedDay}`]: true }));
        setView("done");
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

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return (
      <div style={styles.app}>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "20px" }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <button style={{ ...styles.btnOutline, padding: "8px 14px", fontSize: "11px" }} onClick={() => { pause(); setView("days"); }}>← Exit</button>
            <span style={{ fontSize: "12px", letterSpacing: "1px", color: "#8b7355" }}>{currentExerciseIdx + 1} / {day.exercises.length}</span>
            <span style={{ fontSize: "12px", color: isResting ? "#c8a870" : "#3a3028", letterSpacing: "1px" }}>{isResting ? "REST" : "WORK"}</span>
          </div>

          {/* Progress bar */}
          <div style={{ background: "rgba(200,185,165,0.3)", borderRadius: "4px", height: "3px", marginBottom: "20px" }}>
            <div style={{ background: "#3a3028", borderRadius: "4px", height: "3px", width: `${(currentExerciseIdx / day.exercises.length) * 100}%`, transition: "width 0.4s" }} />
          </div>

          {/* Exercise name */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "3px", color: "#8b7355", margin: "0 0 4px", textTransform: "uppercase" }}>{isResting ? "Rest & Breathe" : exercise?.targets}</p>
            <h2 style={{ ...styles.heading, fontSize: "32px", fontWeight: "300", margin: "0 0 4px" }}>{exercise?.name}</h2>
            <p style={{ fontSize: "13px", color: "#8b7355", margin: 0 }}>{exercise?.sets} sets · {exercise?.reps} reps</p>
          </div>

          {/* SVG Animation */}
          <div style={{ ...styles.card, display: "flex", justifyContent: "center", padding: "16px", marginBottom: "16px", background: isResting ? "rgba(200,170,120,0.15)" : "rgba(255,255,255,0.6)" }}>
            <ExerciseSVG name={exercise?.name} style={{ width: "200px", height: "140px" }} />
          </div>

          {/* Timer */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div style={{ ...styles.timerCircle, borderColor: isResting ? "#c8a870" : "#3a3028" }}>
              <div style={{ ...styles.heading, fontSize: "44px", fontWeight: "300", lineHeight: 1 }}>
                {mins > 0 ? `${mins}:${secs.toString().padStart(2, "0")}` : secs}
              </div>
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#8b7355", marginTop: "4px" }}>seconds</div>
            </div>
          </div>

          {/* Tip */}
          {!isResting && (
            <div style={{ ...styles.card, textAlign: "center", background: "rgba(200,185,165,0.2)", marginBottom: "16px" }}>
              <p style={{ fontSize: "12px", color: "#6b5a3e", margin: 0, fontStyle: "italic" }}>💡 {exercise?.tip}</p>
            </div>
          )}
          {isResting && (
            <div style={{ ...styles.card, textAlign: "center", background: "rgba(200,170,120,0.15)", marginBottom: "16px" }}>
              <p style={{ fontSize: "13px", color: "#8b6a30", margin: 0 }}>Breathe deeply. Shake out the muscles. Ready for next set?</p>
            </div>
          )}

          {/* Controls */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "12px" }}>
            <button style={{ ...styles.btnOutline, padding: "10px 18px" }} onClick={handlePrev} disabled={currentExerciseIdx === 0}>←</button>
            <button style={{ ...styles.btn, padding: "14px 32px", fontSize: "14px" }} onClick={running ? pause : start}>
              {running ? "⏸ Pause" : "▶ Start"}
            </button>
            <button style={{ ...styles.btnOutline, padding: "10px 18px" }} onClick={() => { pause(); reset(exercise?.time || 30); setIsResting(false); }}>↺</button>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button style={{ ...styles.btn, background: "#8b7355", padding: "12px 28px" }} onClick={handleNext}>
              {currentExerciseIdx === day.exercises.length - 1 ? "Complete ✓" : "Next Exercise →"}
            </button>
          </div>

          {/* Exercise list mini */}
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "2px", color: "#8b7355", marginBottom: "8px" }}>ALL EXERCISES</p>
            {day.exercises.map((ex, i) => (
              <div key={i} onClick={() => { setCurrentExerciseIdx(i); setIsResting(false); reset(ex.time || 30); pause(); }}
                style={{ display: "flex", gap: "10px", padding: "8px 12px", borderRadius: "8px", marginBottom: "4px", background: i === currentExerciseIdx ? "rgba(58,48,40,0.1)" : "transparent", cursor: "pointer", alignItems: "center" }}>
                <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>{i < currentExerciseIdx ? "✓" : i === currentExerciseIdx ? "▶" : "○"}</span>
                <span style={{ fontSize: "13px", color: i < currentExerciseIdx ? "#8b7355" : "#3a3028" }}>{ex.name}</span>
                <span style={{ fontSize: "11px", color: "#8b7355", marginLeft: "auto" }}>{ex.sets}×{ex.reps}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── DONE VIEW ────────────────────────────────────────────────────────────────
  if (view === "done") {
    return (
      <div style={{ ...styles.app, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", padding: "40px 24px", maxWidth: "380px" }}>
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>🌸</div>
          <h2 style={{ ...styles.heading, fontSize: "38px", fontWeight: "300", margin: "0 0 8px" }}>Well Done!</h2>
          <p style={{ fontSize: "14px", color: "#8b7355", marginBottom: "32px", lineHeight: 1.6 }}>
            You've completed today's session.<br />Your body is changing — trust the process.
          </p>
          <div style={{ ...styles.card, textAlign: "left", marginBottom: "24px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "2px", color: "#8b7355", margin: "0 0 8px" }}>TODAY'S FOCUS</p>
            {day?.exercises.slice(0, 4).map((ex, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
                <span style={{ color: "#8b7355" }}>✓</span>
                <span style={{ fontSize: "13px" }}>{ex.name}</span>
              </div>
            ))}
            {day?.exercises.length > 4 && <div style={{ fontSize: "12px", color: "#8b7355", marginTop: "4px" }}>+ {day.exercises.length - 4} more</div>}
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button style={styles.btnOutline} onClick={() => setView("days")}>← Week View</button>
            <button style={styles.btn} onClick={() => setView("home")}>Home</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
