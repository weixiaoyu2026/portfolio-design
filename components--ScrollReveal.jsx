// ============================================================
// ScrollReveal — Intersection Observer based reveal
// ============================================================

const { useEffect, useRef } = React;

function ScrollReveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  const delayClass = delay > 0 ? `reveal-delay-${Math.min(Math.ceil(delay / 80), 6)}` : '';

  return (
    <Tag ref={ref} className={`reveal ${delayClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
}

Object.assign(window, { ScrollReveal });
