// ============================================================
// Nebula Background — purple diagonal light beams (Canvas-based)
// Inspired by Reactbits ColorBends / Nebula preset
// ============================================================

function NebulaBackground() {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Parameters — tuned from Nebula preset, adjusted for portfolio use
    const CONFIG = {
      color: { r: 168, g: 85, b: 247 },   // #A855F7
      speed: 0.12,                        // slower than Nebula preset (0.2)
      frequency: 1.0,
      noise: 0.15,
      bandwidth: 0.14,
      rotation: 90,                       // degrees
      intensity: 1.3,
      fadeTop: 0.75,
      iterations: 1,
      opacity: 0.6,                       // overall layer opacity
    };

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const speedMult = isMobile ? 0.4 : 1;
    const finalOpacity = isMobile ? CONFIG.opacity * 0.6 : CONFIG.opacity;

    let w = 0, h = 0;
    let time = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Simple 2D value noise (deterministic, fast)
    function hash(x, y) {
      let h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return h - Math.floor(h);
    }

    function smoothNoise(x, y) {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);

      const a = hash(xi, yi);
      const b = hash(xi + 1, yi);
      const c = hash(xi, yi + 1);
      const d = hash(xi + 1, yi + 1);

      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }

    function fbm(x, y, octaves = 3) {
      let value = 0;
      let amplitude = 0.5;
      let frequency = 1;
      for (let i = 0; i < octaves; i++) {
        value += amplitude * smoothNoise(x * frequency, y * frequency);
        amplitude *= 0.5;
        frequency *= 2;
      }
      return value;
    }

    function draw() {
      // Clear with black base
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      ctx.globalAlpha = finalOpacity;
      ctx.globalCompositeOperation = 'screen';

      const rad = (CONFIG.rotation * Math.PI) / 180;
      const cosR = Math.cos(rad);
      const sinR = Math.sin(rad);
      const cx = w / 2;
      const cy = h / 2;

      // Number of beam layers
      const layers = 3;

      for (let layer = 0; layer < layers; layer++) {
        const layerOffset = layer * 2.3;
        const layerIntensity = CONFIG.intensity * (1 - layer * 0.25);

        // Create an offscreen pattern via direct pixel manipulation would be slow
        // Instead we draw multiple gradient bands shaped by noise

        const numBands = 6;
        for (let i = 0; i < numBands; i++) {
          // Position along the rotated axis
          const t = (i / numBands) * 2 - 1; // -1 to 1
          const noiseVal = fbm(t * CONFIG.frequency * 3 + time * 0.1 + layerOffset, time * 0.08 + layer * 1.7, 2);
          const offset = (noiseVal - 0.5) * 0.4 * CONFIG.noise * 10;

          // Band center in screen space (diagonal direction)
          const bandCenter = t + offset * 0.1;
          const distance = Math.abs(bandCenter);

          // Band shape: Gaussian-like falloff controlled by bandwidth
          const sigma = CONFIG.bandwidth;
          const amplitude = Math.exp(-(distance * distance) / (2 * sigma * sigma)) * layerIntensity;

          if (amplitude < 0.02) continue;

          // Draw a wide rotated gradient band
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rad);

          const bandY = bandCenter * Math.max(w, h) * 0.6;
          const bandWidth = sigma * Math.max(w, h) * 0.8;

          const grad = ctx.createLinearGradient(0, bandY - bandWidth, 0, bandY + bandWidth);
          const alpha1 = 0;
          const alpha2 = amplitude * 0.55;

          grad.addColorStop(0, `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${alpha1})`);
          grad.addColorStop(0.5, `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${alpha2})`);
          grad.addColorStop(1, `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${alpha1})`);

          ctx.fillStyle = grad;
          ctx.fillRect(-w * 1.5, bandY - bandWidth, w * 3, bandWidth * 2);
          ctx.restore();
        }
      }

      // Vertical fade top
      const fadeGrad = ctx.createLinearGradient(0, 0, 0, h * CONFIG.fadeTop);
      fadeGrad.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
      fadeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalCompositeOperation = 'destination-in';
      ctx.globalAlpha = 1;
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 0, w, h * CONFIG.fadeTop);

      // Subtle bottom fade too
      const fadeBottom = ctx.createLinearGradient(0, h * 0.7, 0, h);
      fadeBottom.addColorStop(0, 'rgba(0, 0, 0, 0)');
      fadeBottom.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = fadeBottom;
      ctx.fillRect(0, h * 0.7, w, h * 0.3);

      // Fine grain / noise overlay for texture
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = CONFIG.noise * 0.08;
      // Generate a quick sparse noise pattern with random rects is too slow, skip
      // Instead add a very subtle dot pattern via imageData would be expensive
      // We use a simple trick: draw nothing here, rely on beam softness for quality
    }

    let lastTime = performance.now();
    function tick(now) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!prefersReduced) {
        time += dt * CONFIG.speed * speedMult;
        draw();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    resize();

    // Draw initial frame (even for reduced-motion, show static frame)
    if (prefersReduced) {
      draw();
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }

    const onResize = () => {
      resize();
      if (prefersReduced) draw();
    };

    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return React.createElement('canvas', {
    ref: canvasRef,
    className: 'nebula-bg',
    'aria-hidden': 'true',
  });
}

Object.assign(window, { NebulaBackground });
