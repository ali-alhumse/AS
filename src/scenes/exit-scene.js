export async function renderExitScene({ app, onReplay }) {
    console.log("Exit screen loaded");

    app.innerHTML = `
        <div class="exit-scene-root">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .exit-scene-root {
                    position: relative;
                    min-height: 100dvh;
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: var(--safe-top) var(--safe-right) var(--safe-bottom) var(--safe-left);
                    background: linear-gradient(135deg, #1a0a1e, #2d0f3a);
                    color: #fff;
                }

                .container {
                    max-width: 900px;
                    width: min(100%, 900px);
                    margin: 0 auto;
                    padding: clamp(1rem, 4vw, 2rem);
                    display: flex;
                    flex-direction: column;
                    min-height: 100dvh;
                    position: relative;
                    z-index: 10;
                }

                .header {
                    text-align: center;
                    padding: 3rem 0 2rem;
                    animation: fadeIn 1.5s ease-out forwards;
                    opacity: 0;
                }

                .title {
                    font-size: clamp(2rem, 9vw, 3.5rem);
                    font-weight: 300;
                    letter-spacing: 2px;
                    margin-bottom: 1rem;
                    background: linear-gradient(to right, #f8a5c2, #f78fb3, #d6a2e8);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    text-shadow: 0 2px 10px rgba(248, 165, 194, 0.2);
                }

                .subtitle {
                    font-size: 1.2rem;
                    opacity: 0.8;
                    font-weight: 300;
                    letter-spacing: 1px;
                }

                .messages-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem 0;
                    overflow-y: auto;
                    max-height: 50vh;
                    margin-bottom: 1.5rem;
                }

                .messages-container::-webkit-scrollbar {
                    width: 6px;
                }

                .messages-container::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }

                .messages-container::-webkit-scrollbar-thumb {
                    background: rgba(248, 165, 194, 0.4);
                    border-radius: 10px;
                }

                .message {
                    font-size: clamp(1rem, 4vw, 1.5rem);
                    line-height: 1.65;
                    overflow-wrap: anywhere;
                    text-align: center;
                    max-width: 700px;
                    margin: 1.5rem 0;
                    padding: 1.5rem;
                    border-radius: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
                    transform: translateY(20px);
                    opacity: 0;
                    animation: slideUp 0.8s ease-out forwards;
                }

                .message:nth-child(1) { animation-delay: 0.5s; }
                .message:nth-child(2) { animation-delay: 0.7s; }
                .message:nth-child(3) { animation-delay: 0.9s; }
                .message:nth-child(4) { animation-delay: 1.1s; }
                .message:nth-child(5) { animation-delay: 1.3s; }

                .message-text {
                    background: linear-gradient(to right, #fbc2eb, #a6c1ee);
                    -webkit-background-clip: text;
                    background-clip: text;
                }

                .closing-message {
                    text-align: center;
                    font-size: clamp(1.25rem, 6vw, 2rem);
                    margin: 1.5rem 0;
                    overflow-wrap: anywhere;
                    padding: 1.5rem;
                    border-radius: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
                    transform: translateY(20px);
                    opacity: 0;
                    animation: slideUp 0.8s ease-out 1.5s forwards;
                    color: #fbc2eb;
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                }

                .controls {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    padding: 1rem 0 2rem;
                    margin-top: auto;
                    //background: linear-gradient(to top, rgba(26, 10, 30, 0.9), transparent);
                    padding-top: 1rem;
                }

                .btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #f8a5c2;
                    padding: 0.8rem 2rem;
                    border-radius: 50px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                    font-weight: 500;
                }

                .btn:hover {
                    background: rgba(248, 165, 194, 0.2);
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(248, 165, 194, 0.3);
                }

                .btn:active {
                    transform: translateY(1px);
                }

                .heart-canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .signature {
                    text-align: center;
                    font-size: 1.5rem;
                    opacity: 0.7;
                    margin-top: 2rem;
                    font-style: italic;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .title {
                        font-size: 2.5rem;
                    }

                    .subtitle {
                        font-size: 1rem;
                    }

                    .message {
                        font-size: 1.2rem;
                        padding: 1rem;
                    }
                    .closing-message {
                        font-size: 1.5rem;
                    }

                    .controls {
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem;
                    }

                    .btn {
                        width: 80%;
                        justify-content: center;
                    }

                    .signature {
                        font-size: 1.2rem;
                    }
                }

                @media (max-width: 480px) {
                    .title {
                        font-size: 2rem;
                    }

                    .message {
                        font-size: 1rem;
                    }

                    .closing-message {
                        font-size: 1.2rem;
                    }

                    .container {
                        padding: 1rem 0.5rem;
                    }

                    .messages-container {
                        max-height: 55dvh;
                        padding-block: 1rem;
                    }
                }
            </style>
            <canvas class="heart-canvas" id="heartCanvas"></canvas>

            <div class="container">
                <header class="header">
                    <h1 class="title">Thank You Najme </h1>
                    <p class="subtitle">For sharing this special moment</p>
                </header>

                <div class="messages-container" id="messagesContainer">
                    <!-- Messages will be loaded here -->
                </div>



                <div class="controls">
                    <button class="btn" id="replayBtn">
                    <i class="fas fa-redo"></i> Watch Again
                    </button>
                    <button class="btn" id="exitBtn">
                    <i class="fas fa-times"></i> Close
                    </button>
                </div>

                <div class="closing-message">
                    𓆩𝙉𓆪 علوش 💗 نجومي 𓆩𝘼𓆪
                </div>

            </div>
        </div>
    `;
                // Background Animation Module
                class HeartBackground {
                    constructor() {
                        this.canvas = document.getElementById('heartCanvas');
                        this.ctx = this.canvas.getContext('2d');
                        this.hearts = [];
                        this.rafId = null;

                        this.resizeCanvas();
                        window.addEventListener('resize', () => this.resizeCanvas());

                        this.startAnimation();
                    }

                    resizeCanvas() {
                        this.canvas.width = window.innerWidth;
                        this.canvas.height = window.innerHeight;
                    }

                    createHeart() {
                        const size = Math.random() * 30 + 10;
                        return {
                            x: Math.random() * this.canvas.width,
                            y: this.canvas.height + size,
                            size: size,
                            speed: Math.random() * 2 + 1,
                            opacity: Math.random() * 0.5 + 0.3,
                            color: this.getRandomHeartColor(),
                            sway: Math.random() * 2 - 1,
                            swayOffset: Math.random() * Math.PI * 2
                        };
                    }

                    getRandomHeartColor() {
                        const colors = [
                            'rgba(255, 182, 193, 0.8)', // Light pink
                            'rgba(255, 105, 180, 0.7)', // Hot pink
                            'rgba(255, 192, 203, 0.8)', // Pink
                            'rgba(255, 140, 180, 0.7)', // Deep pink
                            'rgba(255, 20, 147, 0.6)',  // Deep pink
                            'rgba(219, 112, 147, 0.7)', // Pale violet red
                            'rgba(233, 150, 122, 0.6)', // Dark salmon
                            'rgba(255, 228, 225, 0.8)'  // Misty rose
                        ];
                        return colors[Math.floor(Math.random() * colors.length)];
                    }

                    drawHeart(ctx, x, y, size, color) {
                        ctx.save();
                        ctx.globalAlpha = color.split(',')[3].replace(')', '');
                        ctx.fillStyle = color;
                        ctx.beginPath();

                        // Draw a heart shape
                        ctx.moveTo(x, y);
                        ctx.bezierCurveTo(
                            x, y - size/3,
                            x - size/2, y - size/2,
                            x, y
                        );
                        ctx.bezierCurveTo(
                            x, y - size/3,
                            x + size/2, y - size/2,
                            x, y
                        );

                        ctx.fill();
                        ctx.restore();
                    }

                    updateHearts() {
                        // Add new hearts occasionally
                        if (Math.random() > 0.95) {
                            this.hearts.push(this.createHeart());
                        }

                        // Update and remove hearts
                        for (let i = this.hearts.length - 1; i >= 0; i--) {
                            const heart = this.hearts[i];

                            // Move up
                            heart.y -= heart.speed;

                            // Add subtle sway
                            heart.x += Math.sin(Date.now() / 1000 + heart.swayOffset) * heart.sway;

                            // Remove if off screen
                            if (heart.y < -heart.size * 2) {
                                this.hearts.splice(i, 1);
                            }
                        }
                    }

                    render() {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                        // Draw each heart
                        for (const heart of this.hearts) {
                            this.drawHeart(
                                this.ctx,
                                heart.x,
                                heart.y,
                                heart.size,
                                heart.color
                            );
                        }
                    }

                    animate() {
                        this.updateHearts();
                        this.render();
                        this.rafId = requestAnimationFrame(() => this.animate());
                    }

                    startAnimation() {
                        if (!this.rafId) {
                            this.animate();
                        }
                    }

                    stopAnimation() {
                        if (this.rafId) {
                            cancelAnimationFrame(this.rafId);
                            this.rafId = null;
                        }
                    }
                }

// Message Rendering Module
class MessageRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.messages = [];
    }

    async loadMessages() {
        try {
            const response = await fetch('src/data/messages.json');
            if (!response.ok) {
                throw new Error('Failed to load messages.json');
            }
            this.messages = await response.json();
            this.renderMessages();
        } catch (error) {
            console.error('Error loading messages:', error);
            // Fallback messages if JSON fails
            this.messages = [
                { text: "Thank you for being you." },
                { text: "You are deeply appreciated." },
                { text: "Wishing you love and joy." },
                { text: "Your presence matters." },
                { text: "May your days be bright." }
            ];
            this.renderMessages();
        }
    }


    renderMessages() {
    console.log("renderMessages called");
    console.log("Messages loaded:", this.messages);

    this.container.innerHTML = '';

    this.messages.forEach((msg, index) => {
        const messageEl = document.createElement('div');
        messageEl.style.animationDelay = `${index * 0.15}s`;
        messageEl.className = 'message';
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = msg.text;


        messageEl.appendChild(textDiv);
        this.container.appendChild(messageEl);
    });
}
}

// Initialize immediately (IMPORTANT)
const heartBackground = new HeartBackground();
const messageRenderer = new MessageRenderer('messagesContainer');
messageRenderer.loadMessages();

// Buttons
document.getElementById('replayBtn').addEventListener('click', () => {
    onReplay();
});

document.getElementById('exitBtn').addEventListener('click', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';
    heartBackground.stopAnimation();
});

}
