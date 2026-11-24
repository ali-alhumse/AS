export function renderCakeScene({ app, nextSlide }) {
    console.log("Cake slide loaded");
    // For debugging hit areas
     window.debugMode = true;

    app.innerHTML = `
    <style>
    .cake-hint {
  position: absolute;
  bottom: 40px;          /* بأسفل الشاشة مع مسافة لطيفة */
  left: 50%;
  transform: translateX(-50%);

  padding: 12px 22px;
  max-width: 90%;
  text-align: center;

  font-size: 1rem;
  font-weight: 500;
  font-family: "Cairo", "Tajawal", system-ui, sans-serif;

  color: #000;
  background: rgba(255, 105, 180, 0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-radius: 18px;
  box-shadow:
    0 8px 25px rgba(255, 105, 180, 0.25),
    inset 0 0 0 1px rgba(255, 182, 213, 0.25);

  animation: hintFloat 3s ease-in-out infinite;
  z-index: 50;
}

/* حركة خفيفة رومانسية */
@keyframes hintFloat {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
    opacity: 0.85;
  }
  50% {
    transform: translateX(-50%) translateY(-6px);
    opacity: 1;
  }
}
    </style>
        <div style="position: relative; width: 100%; height: 100vh;
             background: linear-gradient(135deg, #FFF5F8 0%, #FFE0ED 40%, #FFD1DC 70%, #FFC8DD 100%);
             display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <canvas id="cakeCanvas"></canvas>
            <button class="secondary-btn" id="nextFromCake" style="
                position: absolute;
                bottom: 25%;
                left: 50%;
                transform: translate(-50%, 50%);
                display: none;
                z-index: 10;
                background: rgba(255, 105, 180, 0.2);
                border: 2px solid #ff69b4;
                color: #ff1493;z-index: 999;">

                <i class="fa-solid fa-arrow-right"></i>
                 Continue
            </button>
          <p class="cake-hint">أسومتي اضغطي على النار اللي فوق الشموع</p>
        </div>
    `;

    const canvas = document.getElementById('cakeCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to be responsive
    function resizeCanvas() {
        canvas.width = Math.min(window.innerWidth, 800);
        canvas.height = Math.min(window.innerHeight, 700);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cake and candle state
    const candles = [
        { x: 0.3, lit: true, opacity: 1, flameOffset: 0 },
        { x: 0.42, lit: true, opacity: 1, flameOffset: 0.5 },
        { x: 0.54, lit: true, opacity: 1, flameOffset: 1 },
        { x: 0.66, lit: true, opacity: 1, flameOffset: 1.5 },
        { x: 0.78, lit: true, opacity: 1, flameOffset: 2 }
    ];

    let messageOpacity = 0;
    let messageGlow = 0;
    let time = 0;
    let allCandlesOut = false;

    // Draw the elegant cake with new colors
    function drawCake() {
        const centerX = canvas.width / 2;
        const cakeWidth = canvas.width * 0.5;
        const cakeLeft = centerX - cakeWidth / 2;

        // Bottom layer - لون كريمي فاتح
        ctx.fillStyle = '#FFF0F6';
        ctx.beginPath();
        drawRoundedRect(ctx, cakeLeft, canvas.height * 0.55, cakeWidth, canvas.height * 0.12, [0, 0, 8, 8]);
        ctx.fill();

        // Middle layer - لون خوخي ناعم
        ctx.fillStyle = '#FFD1DC';
        ctx.beginPath();
        drawRoundedRect(ctx, cakeLeft + cakeWidth * 0.08, canvas.height * 0.48, cakeWidth * 0.84, canvas.height * 0.12, [0, 0, 6, 6]);
        ctx.fill();

        // Top layer - لون وردي مشع
        ctx.fillStyle = '#FF8FA3';
        ctx.beginPath();
        drawRoundedRect(ctx, cakeLeft + cakeWidth * 0.15, canvas.height * 0.41, cakeWidth * 0.7, canvas.height * 0.12, [8, 8, 4, 4]);
        ctx.fill();

        // "20 years" text on cake
        ctx.fillStyle = '#ff69b4';
        ctx.font = `${canvas.width * 0.04}px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('21 years', centerX, canvas.height * 0.47);
    }

    // Helper function to draw rounded rectangles
    function drawRoundedRect(ctx, x, y, width, height, radius) {
        if (typeof radius === 'number') {
            radius = [radius, radius, radius, radius];
        }

        ctx.moveTo(x + radius[0], y);
        ctx.lineTo(x + width - radius[1], y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius[1]);
        ctx.lineTo(x + width, y + height - radius[2]);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius[2], y + height);
        ctx.lineTo(x + radius[3], y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius[3]);
        ctx.lineTo(x, y + radius[0]);
        ctx.quadraticCurveTo(x, y, x + radius[0], y);
        ctx.closePath();
    }

    // Draw candles
    function drawCandles() {
        const centerX = canvas.width / 2;
        const cakeWidth = canvas.width * 0.5;
        const candleY = canvas.height * 0.41;

        candles.forEach((candle, index) => {
            const x = centerX - cakeWidth / 2 + cakeWidth * candle.x;

            // Candle stick
            ctx.fillStyle = candle.lit ? '#ffb3d9' : '#d4a5bb';
            ctx.fillRect(x - 2, candleY - 35, 4, 35);

            // Decorative stripe on candle
            ctx.fillStyle = '#ff87c7';
            ctx.fillRect(x - 2, candleY - 15, 4, 3);

            // Flame
            if (candle.lit && candle.opacity > 0) {
                const flicker = Math.sin(time * 3 + candle.flameOffset) * 2;
                const flameY = candleY - 38 + flicker;

                // Glow effect
                const gradient = ctx.createRadialGradient(x, flameY, 0, x, flameY, 15);
                gradient.addColorStop(0, `rgba(255, 200, 100, ${candle.opacity * 0.6})`);
                gradient.addColorStop(0.5, `rgba(255, 150, 80, ${candle.opacity * 0.3})`);
                gradient.addColorStop(1, `rgba(255, 150, 80, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, flameY, 15, 0, Math.PI * 2);
                ctx.fill();

                // Flame shape
                ctx.fillStyle = `rgba(255, 180, 100, ${candle.opacity})`;
                ctx.beginPath();
                ctx.moveTo(x, flameY - 8);
                ctx.bezierCurveTo(x - 4, flameY - 4, x - 4, flameY + 2, x, flameY + 4);
                ctx.bezierCurveTo(x + 4, flameY + 2, x + 4, flameY - 4, x, flameY - 8);
                ctx.fill();

                // Inner flame
                ctx.fillStyle = `rgba(255, 220, 150, ${candle.opacity})`;
                ctx.beginPath();
                ctx.ellipse(x, flameY, 2, 4, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }

    // Draw birthday message
    function drawMessage() {
        if (messageOpacity > 0) {
            const centerX = canvas.width / 2;
            const messageY = canvas.height * 0.28;

            // Glow effect
            ctx.shadowBlur = 20 + messageGlow * 10;
            ctx.shadowColor = `rgba(255, 179, 217, ${messageOpacity * 0.8})`;

            // Main message with gradient
            const gradient = ctx.createLinearGradient(
                centerX - 150, messageY,
                centerX + 150, messageY + 30
            );
            gradient.addColorStop(0, '#ff69b4');
            gradient.addColorStop(0.5, '#ff1493');
            gradient.addColorStop(1, '#ff0066');

            ctx.fillStyle = gradient;
            ctx.font = `bold ${canvas.width * 0.055}px 'Georgia', 'Segoe UI', serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Happy Birthday', centerX, messageY);
            ctx.fillText('My Love', centerX, messageY + canvas.width * 0.07);

            ctx.shadowBlur = 0;
        }
    }

    let cakeAnimationId;

    // Animation loop
    function animateCake() {
        time += 0.016;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw components
        drawCake();
        drawCandles();

        // Check if all candles are out
        const allOut = candles.every(c => !c.lit);
        if (allOut && !allCandlesOut) {
            allCandlesOut = true;
        }

        // Animate message
        if (allCandlesOut) {
            if (messageOpacity < 1) {
                messageOpacity += 0.015;
                messageGlow = Math.sin(time * 2) * 0.5 + 0.5;
            } else {
                messageGlow = Math.sin(time * 2) * 0.5 + 0.5;
                // Show next button
                const nextButton = document.getElementById('nextFromCake');
                if (nextButton) {
                    nextButton.style.display = 'flex';
                }
            }
        }

        drawMessage();

        // Fade out candles
        candles.forEach(candle => {
            if (!candle.lit && candle.opacity > 0) {
                candle.opacity -= 0.02;
                if (candle.opacity < 0) candle.opacity = 0;
            }
        });

        cakeAnimationId = requestAnimationFrame(animateCake);
    }

    // Handle interaction - FIXED VERSION
    function handleInteraction(x, y) {
        const centerX = canvas.width / 2;
        const cakeWidth = canvas.width * 0.5;
        const candleY = canvas.height * 0.41;

        candles.forEach(candle => {
            const candleX = centerX - cakeWidth / 2 + cakeWidth * candle.x;

            // Calculate distance from click to candle flame position
            const distance = Math.sqrt(Math.pow(x - candleX, 2) + Math.pow(y - (candleY - 38), 2));

            if (distance < 25 && candle.lit) {
                candle.lit = false;
                console.log("🔥 Candle blown!");
            }
        });
    }

    // Mouse/touch events - FIXED
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;    // Relationship bitmap vs. element for X
        const scaleY = canvas.height / rect.height;  // Relationship bitmap vs. element for Y

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        handleInteraction(x, y);
    });

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const touch = e.touches[0];
        const x = (touch.clientX - rect.left) * scaleX;
        const y = (touch.clientY - rect.top) * scaleY;

        handleInteraction(x, y);
    }, { passive: false });

    // Add visual feedback when hovering over candles
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const centerX = canvas.width / 2;
        const cakeWidth = canvas.width * 0.5;
        const candleY = canvas.height * 0.41;

        let isOverCandle = false;
        candles.forEach(candle => {
            if (candle.lit) {
                const candleX = centerX - cakeWidth / 2 + cakeWidth * candle.x;
                const distance = Math.sqrt(Math.pow(x - candleX, 2) + Math.pow(y - (candleY - 38), 2));

                if (distance < 25) {
                    isOverCandle = true;
                }
            }
        });

        // Change cursor when over candle
        canvas.style.cursor = isOverCandle ? 'pointer' : 'default';
    });

    // Start animation
    animateCake();

    // Add roundRect method if not exists
    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
        };
    }

    // Next button event listener
    setTimeout(() => {
        const nextButton = document.getElementById('nextFromCake');
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                cancelAnimationFrame(cakeAnimationId);
                window.removeEventListener('resize', resizeCanvas);
                nextSlide();
            });
        }
    }, 100);


}
