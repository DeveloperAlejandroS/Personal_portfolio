import { useEffect, useRef } from 'react';

export default function AnimatedBackground({ theme }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const themeRef  = useRef(theme);

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, particles, mouse = { x: null, y: null };

    const PARTICLE_COUNT = 70;
    const CONNECT_DIST   = 140;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function isDark() { return themeRef.current === 'dark'; }

    function accentColor(alpha = 1) {
      return isDark()
        ? `rgba(139, 92, 246, ${alpha})`
        : `rgba(13, 148, 136, ${alpha})`;
    }

    function particleColor(alpha = 1) {
      return isDark()
        ? `rgba(167, 139, 250, ${alpha})`
        : `rgba(20, 184, 166, ${alpha})`;
    }

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x  = Math.random() * W;
        this.y  = init ? Math.random() * H : -10;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = Math.random() * 0.3 + 0.1;
        this.r  = Math.random() * 1.8 + 0.6;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        // mouse repulsion
        if (mouse.x !== null) {
          const dx = this.x - mouse.x, dy = this.y - mouse.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            this.x += (dx / d) * 1.2;
            this.y += (dy / d) * 1.2;
          }
        }
        if (this.y > H + 10) this.reset();
        if (this.x < -10 || this.x > W + 10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = particleColor(this.alpha);
        ctx.fill();
      }
    }

    function drawGrid() {
      const step  = 60;
      const color = isDark()
        ? 'rgba(139, 92, 246, 0.04)'
        : 'rgba(13, 148, 136, 0.05)';
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = accentColor(alpha);
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      drawGrid();
      drawConnections();
      particles.forEach((p) => { p.update(); p.draw(); });
      animRef.current = requestAnimationFrame(loop);
    }

    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    window.addEventListener('resize', () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    });
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: theme === 'dark' ? 1 : 0.7,
        transition: 'opacity 0.3s',
      }}
    />
  );
}
