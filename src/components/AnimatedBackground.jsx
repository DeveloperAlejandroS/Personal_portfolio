import { useEffect, useRef } from 'react';

export default function AnimatedBackground({ theme }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const themeRef  = useRef(theme);

  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, particles, mouse = { x: null, y: null }, targetMouse = { x: null, y: null }, scrollY = 0;
    const parallaxLayers = [
      { step: 140, radius: 1.2, alpha: 0.12, speed: 0.015, hueShift: 0 },
      { step: 90, radius: 0.9, alpha: 0.08, speed: 0.03, hueShift: 10 },
      { step: 54, radius: 0.55, alpha: 0.05, speed: 0.05, hueShift: -8 },
    ];

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

    function lerp(current, target, amount) {
      return current + (target - current) * amount;
    }

    function parallaxOffset(depth = 1) {
      const centerX = W / 2;
      const centerY = H / 2;
      const mx = mouse.x === null ? 0 : (mouse.x - centerX) / centerX;
      const my = mouse.y === null ? 0 : (mouse.y - centerY) / centerY;
      const scrollOffset = (scrollY % 600) / 600;
      return {
        x: mx * 24 * depth,
        y: my * 18 * depth + scrollOffset * 10 * depth,
      };
    }

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x  = Math.random() * W;
        this.y  = init ? Math.random() * H : -10;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = Math.random() * 0.28 + 0.08;
        this.r  = Math.random() * 1.8 + 0.6;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.depth = Math.random() * 0.9 + 0.3;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        const offset = parallaxOffset(this.depth);
        this.drawX = this.x + offset.x * 0.22;
        this.drawY = this.y + offset.y * 0.22;

        // mouse repulsion remains subtle and only affects nearby particles
        if (mouse.x !== null) {
          const dx = this.x - mouse.x, dy = this.y - mouse.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            const push = (1 - d / 110) * 0.9;
            this.x += (dx / d) * push * 0.8;
            this.y += (dy / d) * push * 0.8;
          }
        }
        if (this.y > H + 10) this.reset();
        if (this.x < -10 || this.x > W + 10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.drawX ?? this.x, this.drawY ?? this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = particleColor(this.alpha);
        ctx.fill();
      }
    }

    function drawParallaxDots() {
      const baseColors = isDark()
        ? [
            'rgba(192, 132, 252, ',
            'rgba(167, 139, 250, ',
            'rgba(124, 58, 237, ',
          ]
        : [
            'rgba(109, 40, 217, ',
            'rgba(13, 148, 136, ',
            'rgba(59, 130, 246, ',
          ];

      parallaxLayers.forEach((layer, index) => {
        const offset = parallaxOffset(layer.speed);
        const color = baseColors[index % baseColors.length];
        for (let x = -layer.step; x < W + layer.step; x += layer.step) {
          for (let y = -layer.step; y < H + layer.step; y += layer.step) {
            const px = x + offset.x + (index % 2 ? layer.step * 0.35 : 0);
            const py = y + offset.y + (index % 2 ? layer.step * 0.2 : 0);
            const alpha = layer.alpha + (Math.sin((px + py) * 0.003 + scrollY * 0.004) * 0.01);
            ctx.beginPath();
            ctx.arc(px, py, layer.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${color}${Math.max(0.02, alpha)})`;
            ctx.fill();
          }
        }
      });
    }

    function drawGrid() {
      const step  = 60;
      const color = isDark()
        ? 'rgba(139, 92, 246, 0.04)'
        : 'rgba(13, 148, 136, 0.05)';
      const offset = parallaxOffset(0.35);
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1;
      for (let x = 0; x < W; x += step) {
        const px = x + offset.x * 0.12;
        ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        const py = y + offset.y * 0.12;
        ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
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
      if (targetMouse.x === null || targetMouse.y === null) {
        mouse.x = null;
        mouse.y = null;
      } else {
        mouse.x = mouse.x === null ? targetMouse.x : lerp(mouse.x, targetMouse.x, 0.12);
        mouse.y = mouse.y === null ? targetMouse.y : lerp(mouse.y, targetMouse.y, 0.12);
      }

      ctx.clearRect(0, 0, W, H);
      drawParallaxDots();
      drawGrid();
      drawConnections();
      particles.forEach((p) => { p.update(); p.draw(); });
      animRef.current = requestAnimationFrame(loop);
    }

    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    const handleResize = () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    };
    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      targetMouse.x = null;
      targetMouse.y = null;
    };
    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
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
