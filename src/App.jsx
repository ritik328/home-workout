import { useState, useEffect } from "react";
import "./index.css";
import { PROGRAM } from "./data/program";
import HomeView from "./views/HomeView";
import ProgramView from "./views/ProgramView";
import DaysView from "./views/DaysView";
import WorkoutView from "./views/WorkoutView";
import DoneView from "./views/DoneView";
import ProgressView from "./views/ProgressView";
import SettingsView from "./views/SettingsView";
import ShareView from "./views/ShareView";
import {
  setStartDate, getStartDate, getAllLogs, detectMissed, calcStreaks, todayStr,
  getName, getPhoto, getDarkMode, setDarkMode,
} from "./utils/storage";


// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [logs, setLogs] = useState({});
  const [streaks, setStreaks] = useState({ current: 0, best: 0 });
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [userName, setUserName] = useState(getName() || "");
  const [userPhoto, setUserPhoto] = useState(getPhoto() || null);
  const [isDark, setIsDark] = useState(getDarkMode() !== false); // dark by default

  // Apply theme to root on every change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.body.style.background = isDark ? "var(--bg)" : "var(--bg)";
  }, [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    setDarkMode(next);
  };

  const week = PROGRAM.weeks[selectedWeek];
  const day = selectedDay !== null ? week?.days[selectedDay] : null;

  // Today's focus — find the first uncompleted workout day
  const todayFocus = (() => {
    for (let w = 0; w < PROGRAM.weeks.length; w++) {
      for (let d = 0; d < PROGRAM.weeks[w].days.length; d++) {
        if (!logs[`${w}-${d}`] || logs[`${w}-${d}`].status !== "completed") {
          return PROGRAM.weeks[w].days[d].focus;
        }
      }
    }
    return "All Complete 🎉";
  })();

  // ── Init ────────────────────────────────────────────────────────────────
  useEffect(() => {
    setStartDate(todayStr());
    detectMissed(getStartDate(), 12, 7);
    refreshLogs();
  }, []);

  const refreshLogs = () => {
    const allLogs = getAllLogs();
    setLogs(allLogs);
    setStreaks(calcStreaks(getStartDate()));
  };

  const handleSettingsChange = () => {
    setUserName(getName() || "");
    setUserPhoto(getPhoto() || null);
    refreshLogs();
  };

  // Universal bottom-nav handler
  const handleNavigate = (tab) => {
    if (tab === "home") setView("home");
    if (tab === "program") setView("program");
    if (tab === "progress") setView("progress");
    if (tab === "yoga") {
      // Jump to the yoga day of the current week
      const yogaIdx = week?.days.findIndex(d => d.type === "yoga");
      if (yogaIdx >= 0) { setSelectedDay(yogaIdx); setCurrentExerciseIdx(0); setIsResting(false); setWorkoutStartTime(Date.now()); setView("workout"); }
      else setView("program");
    }
  };

  const done = Object.values(logs).filter(l => l.status === "completed").length;

  if (view === "home") return (
    <HomeView
      onStart={() => setView("program")}
      onNavigate={handleNavigate}
      onSettings={() => setView("settings")}
      streak={streaks.current}
      userName={userName}
      userPhoto={userPhoto}
      todayFocus={todayFocus}
      selectedWeek={selectedWeek}
      isDark={isDark}
      toggleTheme={toggleTheme}
    />
  );

  if (view === "program") return (
    <ProgramView
      selectedWeek={selectedWeek}
      onSelectWeek={(weekIdx) => { setSelectedWeek(weekIdx); setView("days"); }}
      onBack={() => setView("home")}
      onNavigate={handleNavigate}
    />
  );

  if (view === "days") return (
    <DaysView
      week={week}
      selectedWeek={selectedWeek}
      logs={logs}
      onSelectDay={(dayIdx) => {
        setSelectedDay(dayIdx);
        setCurrentExerciseIdx(0);
        setIsResting(false);
        setWorkoutStartTime(Date.now());
        setView("workout");
      }}
      onBack={() => setView("program")}
      onNavigate={handleNavigate}
    />
  );

  if (view === "workout" && day) return (
    <WorkoutView
      day={day}
      currentExerciseIdx={currentExerciseIdx}
      setCurrentExerciseIdx={setCurrentExerciseIdx}
      isResting={isResting}
      setIsResting={setIsResting}
      selectedWeek={selectedWeek}
      selectedDay={selectedDay}
      workoutStartTime={workoutStartTime}
      onExit={() => setView("days")}
      onDone={() => { refreshLogs(); setView("done"); }}
    />
  );

  if (view === "done") return (
    <DoneView
      day={day}
      streak={streaks.current}
      done={done}
      total={84}
      onShare={() => setView("share")}
      onWeekView={() => setView("days")}
      onHome={() => setView("home")}
    />
  );

  if (view === "progress") return (
    <ProgressView
      logs={logs}
      streaks={streaks}
      program={PROGRAM}
      onBack={() => setView("home")}
      onNavigate={handleNavigate}
    />
  );

  if (view === "settings") return (
    <SettingsView
      onBack={() => setView("home")}
      onSettingsChange={handleSettingsChange}
    />
  );

  if (view === "share") return (
    <ShareView
      day={day}
      selectedWeek={selectedWeek}
      selectedDay={selectedDay}
      onBack={() => setView("done")}
    />
  );

  return null;
}
