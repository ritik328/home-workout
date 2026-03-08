// ─── DESIGN TOKENS via CSS variables ─────────────────────────────────────────
// ALL colors reference CSS custom properties so dark/light mode works via
// a single [data-theme="light"] attribute on <html>.
export const C = {
    bg: "var(--bg)",
    surface: "var(--surface)",
    surface2: "var(--surface2)",
    accent: "var(--accent)",
    accentGlow: "var(--accent-glow)",
    text: "var(--text)",
    muted: "var(--muted)",
    border: "var(--border)",
    green: "var(--green)",
    red: "var(--red)",
    purple: "var(--purple)",
    btnText: "var(--btn-text)",
};

const styles = {
    app: {
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        width: "100%",
    },
    container: {
        width: "100%",
        maxWidth: "520px",
        margin: "0 auto",
        padding: "20px 20px 110px 20px",
        paddingBottom: "calc(110px + env(safe-area-inset-bottom, 0px))",
        boxSizing: "border-box",
        overflowX: "hidden",
    },
    heading: {
        fontFamily: "'DM Sans', -apple-system, sans-serif",

        color: "var(--text)",
    },
    card: {
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "12px",
        boxSizing: "border-box",
    },
    btn: {
        background: "var(--accent)",
        color: "var(--btn-text)",
        border: "none",
        borderRadius: "50px",
        padding: "14px 32px",
        fontFamily: "'Inter', -apple-system, sans-serif",

        fontSize: "13px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontWeight: "500",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
    },
    btnOutline: {
        background: "transparent",
        color: "var(--muted)",
        border: "1px solid var(--border)",
        borderRadius: "50px",
        padding: "10px 20px",
        fontFamily: "'Inter', -apple-system, sans-serif",

        fontSize: "12px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
    },
    timerCircle: {
        width: "160px",
        height: "160px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "0 auto",
        position: "relative",
    },
    tag: {
        background: "var(--accent-glow)",
        color: "var(--accent)",
        borderRadius: "50px",
        padding: "4px 12px",
        fontSize: "11px",
        letterSpacing: "0.1em",
        display: "inline-block",
    },
    label: {
        fontSize: "11px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--muted)",
    },
};

export default styles;
