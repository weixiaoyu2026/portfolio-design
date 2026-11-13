// ============================================================
// NavProgress — Scroll progress bar + side dot nav
// ============================================================

const { useState, useEffect } = React;

function NavProgress({ sections, activeSection }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="nav-progress">
        <div className="nav-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <nav className="side-nav">
        {sections.map((s) => (
          <div
            key={s.id}
            className={`side-nav-item ${activeSection === s.id ? 'is-active' : ''}`}
            onClick={() => handleNavClick(s.id)}
          >
            <span className="side-nav-label">{s.label}</span>
            <span className="side-nav-dot" />
          </div>
        ))}
      </nav>
    </>
  );
}

Object.assign(window, { NavProgress });
