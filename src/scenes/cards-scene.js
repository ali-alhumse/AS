export async function renderCardsScene({ app, nextSlide }) {
  try {
    /* ===== Load JSON ===== */
    const res = await fetch("src/data/cards.json");
    const data = await res.json();
    const cards = data.cards;

    /* ===== Inject HTML ===== */
    app.innerHTML = `
      <div class="romantic-slide-container">
        <div class="floating-animation-layer"></div>

        <div class="romantic-slide-wrapper">
          <div class="romantic-slide-content">
            ${cards.map((card, i) => `
              <div class="romantic-card ${i === 0 ? "active-card" : i === 1 ? "next-card" : ""}" data-card="${i}">
                <div class="card-label">${card.label}</div>

                <div class="card-content">
                  <h2 class="romantic-title">${card.title}</h2>

                  <p class="romantic-message">
                    ${card.text.map(line => line === "" ? "<br>" : `${line}<br>`).join("")}
                  </p>

                  <div class="signature">${card.signature}</div>

                  <button class="${i === 0 ? "card-switch-btn" : "next-slide-btn"}" data-action="${i}">
                    ${card.button}
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    /* ===== Inject CSS ===== */
    const style = document.createElement("style");
    style.textContent = `
      /* تأثيرات خلفية وتحريك */
      .romantic-slide-container {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #2b0a3d, #4b145f);
        perspective: 1200px;
      }

      .romantic-slide-container .floating-animation-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
      }

      .romantic-slide-container .floating-dot {
        position: absolute;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(255,182,193,.9), transparent 70%);
        border-radius: 50%;
        animation: floatUp linear infinite;
        opacity: .6;
      }

      @keyframes floatUp {
        from { transform: translateY(100vh); opacity: 0; }
        to   { transform: translateY(-20vh); opacity: 1; }
      }

      /* Wrapper جديد لمحاذاة المركز */
      .romantic-slide-container .romantic-slide-wrapper {
        position: relative;
        z-index: 5;
        width: 90%;
        max-width: 620px;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* الحاوية الرئيسية للبطاقات */
      .romantic-slide-container .romantic-slide-content {
        position: relative;
        width: 100%;
        height: 100%;
      }

      /* تصميم البطاقة */
      .romantic-slide-container .romantic-card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95) rotateY(10deg);
        width: 100%;
        height: auto;
        min-height: 450px;
        background: rgba(255,255,255,.12);
        backdrop-filter: blur(16px);
        border-radius: 30px;
        padding: 40px 30px;
        text-align: center;
        transform-style: preserve-3d;
        opacity: 0;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 12px 40px rgba(255,105,180,.35);
        border: 1px solid rgba(255,182,193,.25);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      /* البطاقة النشطة (مركز الشاشة) */
      .romantic-slide-container .romantic-card.active-card {
        opacity: 1;
        pointer-events: auto;
        z-index: 10;
        transform: translate(-50%, -50%) scale(1) rotateY(0deg);
      }

      /* البطاقة التالية (جاهزة للدخول من اليمين) */
      .romantic-slide-container .romantic-card.next-card {
        opacity: 0;
        z-index: 5;
        transform: translate(150%, -50%) scale(0.95) rotateY(10deg);
      }

      /* البطاقة السابقة (تخرج إلى اليسار) */
      .romantic-slide-container .romantic-card.prev-card {
        opacity: 0;
        z-index: 4;
        transform: translate(-250%, -50%) scale(0.9) rotateY(-10deg);
      }

      .romantic-slide-container .card-label {
        position: absolute;
        top: 12px;
        right: 16px;
        font-size: 0.7rem;
        padding: 3px 10px;
        background: rgba(255, 182, 193, 0.2);
        color: #ffb6c1;
        border-radius: 20px;
        opacity: 0.65;
        backdrop-filter: blur(6px);
      }

      .romantic-slide-container .romantic-title {
        font-size: 2.2rem;
        margin-bottom: 20px;
        background: linear-gradient(90deg,#ff7eb3,#ffb3d9,#c9a0dc);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 800;
      }

      .romantic-slide-container .romantic-message {
        font-size: 1.25rem;
        line-height: 1.9;
        color: rgba(255,255,255,.95);
        margin-bottom: 25px;
        letter-spacing: 0.3px;
      }

      .romantic-slide-container .signature {
        font-size: 1.4rem;
        font-weight: 700;
        color: #ffd166;
        margin-bottom: 25px;
      }

      /* أزرار مخصصة للشريحة فقط */
      .romantic-slide-container button {
        border: none;
        border-radius: 50px;
        padding: 12px 30px;
        font-size: 1.05rem;
        font-weight: 600;
        cursor: pointer;
        background: linear-gradient(135deg,#ff7eb3,#b967ff);
        color: #fff;
        transition: .3s;
        box-shadow: 0 6px 20px rgba(255,105,180,.45);
        margin-top: auto;
        align-self: center;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
      }

      .romantic-slide-container button:hover {
        transform: translateY(-3px) scale(1.05);
      }

      .romantic-slide-container .card-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
      }
    `;
    document.head.appendChild(style);

    /* ===== Card Logic ===== */
    const cardsEls = document.querySelectorAll(".romantic-card");
    let currentCard = 0;

    document.querySelectorAll("button[data-action]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = Number(btn.dataset.action);

        if (index === 0) {
          // تبديل من البطاقة الأولى إلى الثانية
          cardsEls[0].classList.remove("active-card");
          cardsEls[0].classList.add("prev-card");

          cardsEls[1].classList.remove("next-card");
          cardsEls[1].classList.add("active-card");

          currentCard = 1;

        } else if (index === 1) {
          // عند النقر على زر "Next Slide" في البطاقة الثانية
          console.log("Next slide clicked - should go to next slide");

          // التأكد من أن nextSlideCallback موجودة ويمكن استدعاؤها
          nextSlide();
        }
      });
    });

    /* ===== Floating Background ===== */
    const layer = document.querySelector(".floating-animation-layer");
    for (let i = 0; i < 22; i++) {
      const dot = document.createElement("div");
      dot.className = "floating-dot";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.animationDuration = (10 + Math.random() * 15) + "s";
      dot.style.animationDelay = (Math.random() * 5) + "s";
      layer.appendChild(dot);
    }

  } catch (err) {
    console.error("Romantic slide failed:", err);
  }
}
