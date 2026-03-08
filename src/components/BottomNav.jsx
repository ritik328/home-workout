import { C } from "./styles";

// ─── BOTTOM NAV ─────────────────────────────────────────────────────────────
const TABS = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "program", icon: "📅", label: "Program" },
    { id: "progress", icon: "📊", label: "Progress" },
    { id: "yoga", icon: "🧘", label: "Yoga" },
];

const BottomNav = ({ active, onNavigate }) => (
    <nav className="bottom-nav">
        {TABS.map(tab => (
            <button
                key={tab.id}
                className={`nav-tab ${active === tab.id ? "active" : ""}`}
                onClick={() => onNavigate(tab.id)}
            >
                <span className="nav-tab-icon">{tab.icon}</span>
                <span className="nav-tab-label">{tab.label}</span>
                {active === tab.id && <div className="nav-tab-dot" />}
            </button>
        ))}
    </nav>
);

export default BottomNav;
