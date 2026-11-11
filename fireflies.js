// 첫 화면 배경의 반딧불: 천천히 떠오르며 깜빡이는 초록 점.
// 움직임 줄이기 설정이면 한 번만 그리고 멈춘다. 탭이 가려지면 rAF가 알아서 쉰다.
(() => {
  const canvas = document.getElementById('fireflies');
  const ctx = canvas.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, flies;

  function resize() {
    const ratio = Math.min(devicePixelRatio, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    flies = Array.from({ length: Math.round((w * h) / 14000) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      rise: 4 + Math.random() * 10,          // 초당 px
      sway: Math.random() * Math.PI * 2,
      blink: 0.3 + Math.random() * 0.9,
    }));
  }

  function draw(ms) {
    const t = ms / 1000;
    ctx.clearRect(0, 0, w, h);
    for (const f of flies) {
      const y = (((f.y - f.rise * t) % h) + h) % h;
      const x = f.x + Math.sin(t * 0.4 + f.sway) * 12;
      ctx.globalAlpha = 0.15 + 0.55 * (0.5 + 0.5 * Math.sin(t * f.blink + f.sway));
      ctx.fillStyle = f.r > 1.8 ? '#f4f2ec' : '#86c95f';
      ctx.beginPath();
      ctx.arc(x, y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!still) requestAnimationFrame(draw);
  }

  addEventListener('resize', () => { resize(); if (still) draw(0); });
  resize();
  requestAnimationFrame(draw);
})();
