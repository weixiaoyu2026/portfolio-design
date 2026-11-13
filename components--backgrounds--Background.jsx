// ============================================================
// Background — combined DotField + ColorBends + vignette
// Bottom: DotField (subtle dot grid)
// Middle: ColorBends (purple light beams, official Reactbits shader)
// Top: vignette overlay (soft dark edges for text readability)
// Fades in only on Cover & Ending, hidden in between (scrolly reveal)
// ============================================================

// Error boundary：任何背景子层（WebGL/Canvas）出错时静默降级，绝不拖垮整站
class BackgroundErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function Background() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [hasThree, setHasThree] = React.useState(!!window.THREE);
  const [visibility, setVisibility] = React.useState(1); // 0..1, driven by scroll
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  React.useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);

  React.useEffect(() => {
    if (window.THREE) {
      setHasThree(true);
    } else {
      const timer = setInterval(() => {
        if (window.THREE) {
          setHasThree(true);
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, []);

  // IntersectionObserver: fade background in when cover/ending are visible
  React.useEffect(() => {
    const cover = document.getElementById('cover');
    const ending = document.getElementById('ending');
    if (!cover && !ending) return;

    // Thresholds for smooth fade (21 steps 0..1)
    const thresholds = [];
    for (let i = 0; i <= 100; i++) thresholds.push(i / 100);

    const state = { cover: 0, ending: 0 };
    let rafId = null;

    const update = () => {
      rafId = null;
      const v = Math.max(state.cover, state.ending);
      setVisibility(v);
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (id === 'cover') state.cover = entry.intersectionRatio;
          else if (id === 'ending') state.ending = entry.intersectionRatio;
        }
        scheduleUpdate();
      },
      {
        root: null,
        threshold: thresholds,
      }
    );

    if (cover) observer.observe(cover);
    if (ending) observer.observe(ending);

    // Initial state sync in case page loads mid-scroll
    const syncInitial = () => {
      if (cover) {
        const r = cover.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.max(0, Math.min(vh, r.bottom) - Math.max(0, r.top));
        state.cover = visible / Math.max(1, vh, r.height);
      }
      if (ending) {
        const r = ending.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.max(0, Math.min(vh, r.bottom) - Math.max(0, r.top));
        state.ending = visible / Math.max(1, vh, r.height);
      }
      setVisibility(Math.max(state.cover, state.ending));
    };
    syncInitial();

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // ColorBends params — desktop
  const cbSpeed = isMobile ? 0.08 : 0.2;
  const cbIntensity = isMobile ? 0.9 : 1.3;

  // DotField params
  const dfDotRadius = isMobile ? 0.6 : 0.8;
  const dfDotSpacing = isMobile ? 10 : 12;

  const baseOpacity = isMobile ? 0.3 : 0.45;
  const wrapperOpacity = baseOpacity * visibility;

  return React.createElement(
    'div',
    {
      ref: wrapperRef,
      className: 'background-wrapper',
      style: {
        opacity: wrapperOpacity,
        transition: 'opacity 0.15s linear',
        willChange: 'opacity',
      },
      'aria-hidden': 'true',
    },
    // Layer 1: DotField (bottom)
    React.createElement('div', {
      className: 'bg-layer bg-dotfield',
    },
      React.createElement(DotField, {
        dotRadius: dfDotRadius,
        dotSpacing: dfDotSpacing,
        cursorRadius: 0,
        cursorForce: 0,
        bulgeOnly: true,
        bulgeStrength: 0,
        glowRadius: 0,
        sparkle: false,
        waveAmplitude: 0,
        gradientFrom: 'rgba(168, 85, 247, 0.18)',
        gradientTo: 'rgba(168, 85, 247, 0.08)',
        glowColor: '#000000',
      })
    ),
    // Layer 2: ColorBends (middle) — only when THREE is loaded and not reduced motion
    React.createElement(BackgroundErrorBoundary, null,
    hasThree && !reducedMotion && React.createElement('div', {
      className: 'bg-layer bg-colorbends',
    },
      React.createElement(ColorBends, {
        colors: ['#A855F7'],
        rotation: 90,
        speed: cbSpeed,
        scale: 1,
        frequency: 1,
        warpStrength: 1,
        mouseInfluence: 0.35,
        parallax: 0.2,
        noise: 0.15,
        iterations: 1,
        intensity: cbIntensity,
        bandWidth: 6,
        transparent: true,
      })
    )),
    // Layer 3: vignette / edge darkening (top)
    React.createElement('div', { className: 'bg-layer bg-vignette' })
  );
}

Object.assign(window, { Background });
