// Background dotted grid on canvas (subtle, performant)
(function () {
  const canvas = document.getElementById('bg-grid');
  const ctx = canvas.getContext('2d');
  let w, h, t = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const gap = 24; // spacing of dots
    const r = 1.1;  // radius of dots
    const phase = t * 0.5;

    for (let y = 0; y < window.innerHeight + gap; y += gap) {
      for (let x = 0; x < window.innerWidth + gap; x += gap) {
        // slight shimmer using sine wave
        const s = Math.sin((x + y) * 0.02 + phase) * 0.05 + 0.15;
        ctx.fillStyle = `rgba(180, 220, 255, ${s})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    t += 0.02;
    requestAnimationFrame(draw);
  }
  draw();
})();

// Scroll reveal
(function () {
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();

// Year in footer
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Micro-interactions: tilt on hover for cards
(function () {
  const cards = document.querySelectorAll('.card-sm, .item');
  const maxTilt = 6; // degrees

  cards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rx = (-dy * maxTilt).toFixed(2);
      const ry = (dx * maxTilt).toFixed(2);
      card.style.transition = 'transform .06s ease';
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .2s ease';
      card.style.transform = 'none';
    });
  });
})();
