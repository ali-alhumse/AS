export function renderHeartScene({ app, nextSlide }) {
    console.log("Heart slide loaded");

    app.innerHTML = `
        <div style="position: relative; width: 100%; height: 100vh; background: linear-gradient(to bottom, #1a0a1f, #0a0515);">
            <canvas id="heartCanvas"></canvas>
            <button class="secondary-btn" id="nextFromHeart"
                style="
                position:absolute;
                bottom: 20%;
                left:50%;
                transform:translate(-50%, 50%);
                z-index:10;
                background: rgba(255, 105, 180, 0.2);
                border: 2px solid #ff69b4;
                color: white;">
                <i class="fa-solid fa-arrow-right"></i> Continue
            </button>
        </div>
    `;

    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');

    // ضبط حجم الكانفاس
    function resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const heartSize = Math.min(window.innerWidth, window.innerHeight) * 0.4;

    // معادلة القلب البارامترية الصحيحة
    function heartPoint(t, size = 1) {
        // المعادلة: x = 16 sin³(t), y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        return {
            x: centerX + x * heartSize * 0.04 * size,
            y: centerY + y * heartSize * 0.04 * size
        };
    }

    // إنشاء جسيمات القلب
    const particles = [];
    const particleCount = 600;

    for (let i = 0; i < particleCount; i++) {
        const t = Math.random() * Math.PI * 2;
        const size = 0.5 + Math.random() * 0.5;
        const point = heartPoint(t, size);

        particles.push({
            x: point.x,
            y: point.y,
            originalX: point.x,
            originalY: point.y,
            size: 2 + Math.random() * 2,
            color: `hsl(${330 + Math.random() * 30}, ${80 + Math.random() * 20}%, ${70 + Math.random() * 20}%)`,
            speed: 0.002 + Math.random() * 0.003,
            angle: t,
            orbitRadius: 5 + Math.random() * 15,
            timeOffset: Math.random() * Math.PI * 2
        });
    }

    // تفاعل الماوس
    let mouseX = centerX;
    let mouseY = centerY;
    let isInteracting = false;

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isInteracting = true;
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        isInteracting = true;
    });

    canvas.addEventListener('mouseleave', () => {
        mouseX = centerX;
        mouseY = centerY;
        isInteracting = false;
    });

    let animationId;
    let time = 0;
    let glowPhase = 0;

    function animate() {
        animationId = requestAnimationFrame(animate);

        // مسح الشاشة بخلفية شفافة
        ctx.fillStyle = 'rgba(26, 10, 31, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        time += 0.01;
        glowPhase += 0.03;

        // تحديث ورسم الجسيمات
        particles.forEach(particle => {
            // حركة مدارية حول نقطة القلب الأصلية
            particle.angle += particle.speed;

            // حساب الموضع المستهدف مع حركة مدارية
            const orbitX = Math.cos(particle.angle + particle.timeOffset) * particle.orbitRadius;
            const orbitY = Math.sin(particle.angle + particle.timeOffset) * particle.orbitRadius;

            // الموضع المستهدف (القلب + مدار)
            const targetPoint = heartPoint(particle.angle, 0.8);
            const targetX = targetPoint.x + orbitX;
            const targetY = targetPoint.y + orbitY;

            // تأثير الماوس
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (isInteracting && distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(dy, dx);

                particle.x += Math.cos(angle) * force * 3;
                particle.y += Math.sin(angle) * force * 3;
            } else {
                // العودة للهدف (قلب + مدار)
                particle.x += (targetX - particle.x) * 0.05;
                particle.y += (targetY - particle.y) * 0.05;
            }

            // حركة نابضية خفيفة
            const pulse = Math.sin(time + particle.timeOffset) * 0.5 + 0.5;
            const currentSize = particle.size * (0.8 + pulse * 0.2);

            // رسم الجسيم مع توهج
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, currentSize * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.7, particle.color.replace(')', ', 0.6)').replace('hsl', 'hsla'));
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // نقطة مركزية ساطعة
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentSize * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        });

        drawLetterA();

        // رسم خطوط بين الجسيمات القريبة
        if (!isInteracting) {
            drawConnections();
        }
    }

    function drawLetterA() {
        ctx.save();

        const fontSize = heartSize * 0.6;
        ctx.font = `bold ${fontSize}px 'Arial', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // تدرج لوني للحرف
        const gradient = ctx.createLinearGradient(
            centerX - heartSize * 0.3,
            centerY,
            centerX + heartSize * 0.3,
            centerY
        );
        gradient.addColorStop(0, '#ffb6c1');
        gradient.addColorStop(0.5, '#ff69b4');
        gradient.addColorStop(1, '#ff1493');

        // تأثير توهج متحرك
        const glowSize = 25 + Math.sin(glowPhase) * 10;
        ctx.shadowColor = '#ff69b4';
        ctx.shadowBlur = glowSize;

        // رسم الحرف
        ctx.fillStyle = gradient;
        ctx.fillText('A', centerX, centerY);

        // تأثير حدود
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeText('A', centerX, centerY);

        ctx.restore();
    }

    function drawConnections() {
        ctx.strokeStyle = 'rgba(255, 182, 193, 0.1)';
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i += 2) {
            for (let j = i + 1; j < Math.min(i + 10, particles.length); j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 50) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // بدء الرسوم المتحركة
    animate();

    // زر الانتقال
    document.getElementById('nextFromHeart').addEventListener('click', () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resizeCanvas);
        nextSlide();
    });

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resizeCanvas);
    };
}
