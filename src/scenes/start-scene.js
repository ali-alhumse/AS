export function renderStartScene({ app, onReady }) {
  const TARGET = new Date(2026, 11, 30, 0, 0, 0, 0); // des 30, 2026 midnight

  function pad(n) { return String(n).padStart(2, '0'); }

  function getCountdown() {
    const now = new Date();
    const diff = TARGET - now;
    if (diff <= 0) return null;

    // Days remaining
    const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetMidnight = new Date(2026, 11, 30, 0, 0, 0, 0);
    const daysLeft = Math.ceil((targetMidnight - nowMidnight) / 86400000);

    // Time left until end of today (or until target on last day)
    const isLastDay = now.getDate() === 30 && now.getMonth() === 11 && now.getFullYear() === 2026;
    const endOfPeriod = isLastDay
      ? TARGET
      : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);

    const s = Math.floor((endOfPeriod - now) / 1000);
    return {
      days: daysLeft,
      h: pad(Math.floor(s / 3600)),
      m: pad(Math.floor((s % 3600) / 60)),
      s: pad(s % 60)
    };
  }

  app.innerHTML = `
    <div class="start-slide">
      <div class="start-bg"></div>
      <div class="start-card">
        <h1 class="start-title">Birthday Surprise</h1>

        <div id="countdownWrap">
          <div id="daysBox" style="
            font-size: 90px;
            font-weight: 900;
            line-height: 1;
            background: linear-gradient(160deg, #f0d080, #c8a84b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
          ">17</div>
          <div style="text-align:center; font-size:18px; color:rgba(255,255,255,0.6); letter-spacing:3px; margin-bottom:20px;">
            يوماً متبقياً
          </div>
          <div id="clockBox" style="
            display: flex;
            gap: 6px;
            justify-content: center;
            align-items: center;
            font-size: 36px;
            font-weight: 900;
            color: white;
          ">
            <span id="ckH">00</span>
            <span style="opacity:0.4; animation: blink 1s infinite;">:</span>
            <span id="ckM">00</span>
            <span style="opacity:0.4; animation: blink 1s infinite;">:</span>
            <span id="ckS">00</span>
          </div>
          <div style="text-align:center; font-size:11px; color:rgba(255,255,255,0.3); letter-spacing:2px; margin-top:8px;">
            الوقت المتبقي في اليوم الحالي
          </div>
        </div>

        <button class="start-btn" id="startBtn" style="display:none;">
          Start
        </button>
      </div>
    </div>
  ;`

  // inject blink keyframe once
  if (!document.getElementById('cdStyle')) {
    const st = document.createElement('style');
    st.id = 'cdStyle';
    st.textContent = '@keyframes blink { 0%, 100%{opacity:0.4} 50%{opacity:0.1} }';
    document.head.appendChild(st);
  }

  let timer = setInterval(() => {
    const cd = getCountdown();

    if (!cd) {
      // Time is up — show start button, hide countdown
      clearInterval(timer);
      document.getElementById('countdownWrap').style.display = 'none';
      const btn = document.getElementById('startBtn');
      if (btn) {
        btn.style.display = 'block';
        btn.onclick = () => { onReady(); };
      }
      return;
    }

    const daysEl = document.getElementById('daysBox');
    if (daysEl) daysEl.textContent = cd.days;
    const h = document.getElementById('ckH');
    const m = document.getElementById('ckM');
    const s = document.getElementById('ckS');
    if (h) h.textContent = cd.h;
    if (m) m.textContent = cd.m;
    if (s) s.textContent = cd.s;

  }, 1000);

  // run once immediately to populate values
  const cd = getCountdown();
  if (!cd) {
    document.getElementById('countdownWrap').style.display = 'none';
    const btn = document.getElementById('startBtn');
    if (btn) {
      btn.style.display = 'block';
      btn.onclick = () => { onReady(); };
    }
  } else {
    document.getElementById('daysBox').textContent = cd.days;
    document.getElementById('ckH').textContent = cd.h;
    document.getElementById('ckM').textContent = cd.m;
    document.getElementById('ckS').textContent = cd.s;
  }
}
