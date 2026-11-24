export async function renderGalleryScene({ app, nextSlide, endProject }) {
    console.log("Gallery slide loaded");

    // First show loading screen
    app.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #f7f7f7 0%, #eef2f3 100%);">
            <div style="font-size: 24px; color: #ff69b4; margin-bottom: 20px;">
                <i class="fa-solid fa-spinner fa-spin"></i>
            </div>
            <p style="color: #666; font-size: 18px;">Loading memories...</p>
        </div>
    `;

    try {
        // Try to load from JSON first
        let memories;
        try {
            const res = await fetch('src/data/memories.json');
            if (!res.ok) throw new Error('Failed to fetch JSON');
            memories = await res.json();
            console.log("JSON loaded successfully:", memories);
        } catch (fetchError) {
            console.log("Using fallback memories data:", fetchError);
            // Fallback data with working Unsplash URLs
            memories = [
                {
                    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop&q=80",
                    caption: "Beautiful moments we shared together"
                },
                {
                    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&h=600&fit=crop&q=80",
                    caption: "Special times filled with laughter"
                },
                {
                    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80",
                    caption: "Unforgettable memories that last forever"
                },
                {
                    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop&q=80",
                    caption: "Cherished moments of happiness"
                },
                {
                    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&q=80",
                    caption: "Beautiful journey together"
                }
            ];
        }

        // Now render the gallery
        app.innerHTML = `
            <div class="gallery-container" style="
                position: relative;
                width: 90vw;
                max-width: 900px;
                height: 75vh;
                max-height: 650px;
                perspective: 1200px;
                margin: 20px auto;
                overflow: hidden;
                animation: fadeInUp 0.8s ease-out;
            ">
                <div class="carousel-wrapper" style="
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                ">
                    <div class="carousel-inner" style="
                        position: relative;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
                    "></div>
                </div>

                <button class="nav-btn prev-btn" aria-label="Previous" style="
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 20px;
                    width: 50px;
                    height: 50px;
                    background-color: rgba(255, 255, 255, 0.3);
                    border: none;
                    border-radius: 50%;
                    color: #ff69b4;
                    font-size: 1.6em;
                    cursor: pointer;
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    transition: all 0.3s ease;
                    z-index: 20;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-chevron-left"></i>
                </button>

                <button class="nav-btn next-btn" aria-label="Next" style="
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 20px;
                    width: 50px;
                    height: 50px;
                    background-color: rgba(255, 255, 255, 0.3);
                    border: none;
                    border-radius: 50%;
                    color: #ff69b4;
                    font-size: 1.6em;
                    cursor: pointer;
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    transition: all 0.3s ease;
                    z-index: 20;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-chevron-right"></i>
                </button>

                <div class="counter" style="
                    position: absolute;
                    top: 25px;
                    right: 25px;
                    background-color: rgba(255, 255, 255, 0.92);
                    color: #ff69b4;
                    padding: 10px 20px;
                    border-radius: 25px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
                    z-index: 15;
                ">1 / ${memories.length}</div>

                <div class="caption-container" style="
                    position: absolute;
                    bottom: 25%;
                    left: 0;
                    right: 50%;
                    transform: translate(50%, 50%);
                    display: flex;
                    justify-content: center;
                    z-index: 15;
                    // background-color: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
                ">
                    <div class="caption" style="
                        text-align: center;
                        font-size: 1.1rem;
                        line-height: 1.6;
                        color: #333;
                        // padding: 18px 30px;
                        border-radius: 15px;
                        z-index: 15;
                        max-width: 80%;

                        transition: all 0.5s ease;
                        font-weight: 500;
                    ">${memories[0].caption}</div>
                </div>

                </div>
                <button class="finish-gallery-btn" style="
                    position: absolute;
                    bottom: 10%;
                    right: 50%;
                    padding: 14px 28px;
                    font-size: 1rem;
                    font-weight: 600;
                    background: linear-gradient(135deg, #ff69b4, #ff1493);
                    color: white;
                    border: none;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 100;
                    box-shadow: 0 10px 25px rgba(255, 105, 180, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    opacity: 1;
                    transform: translate(50%,50%);
                ">
                    <i class="fas fa-heart"></i> Finish Show
                </button>

            <style>
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .carousel-item {
                    position: absolute;
                    width: 85%;
                    height: 85%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    border-radius: 16px;
                    box-shadow:
                        0 15px 40px rgba(0, 0, 0, 0.15),
                        0 0 0 1px rgba(255, 255, 255, 0.1) inset;
                    backface-visibility: hidden;
                    transform-style: preserve-3d;
                    opacity: 0.7;
                    transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
                    overflow: hidden;
                    cursor: pointer;
                    padding: 15px;
                }

                .carousel-item .image-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border-radius: 12px;
                }

                .carousel-item .image-container img {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    border-radius: 10px;
                    display: block;
                }

                .carousel-item.active {
                    transform: translateZ(0) rotateY(0deg) scale(1.05);
                    opacity: 1;
                    z-index: 10;
                    box-shadow:
                        0 25px 60px rgba(0, 0, 0, 0.2),
                        0 0 0 1px rgba(255, 255, 255, 0.2) inset;
                }

                .carousel-item.active .image-container img {
                    transform: scale(1.02);
                    transition: transform 0.3s ease;
                }

                .carousel-item.prev {
                    transform: translateZ(-400px) rotateY(-35deg) scale(0.85);
                    opacity: 0.6;
                    z-index: 5;
                    filter: brightness(0.8);
                }

                .carousel-item.next {
                    transform: translateZ(-400px) rotateY(35deg) scale(0.85);
                    opacity: 0.6;
                    z-index: 5;
                    filter: brightness(0.8);
                }

                .nav-btn:hover {
                    background-color: #ff69b4;
                    color: white;
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 12px 30px rgba(255, 105, 180, 0.3);
                }

                .caption.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .finish-gallery-btn.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .finish-gallery-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 30px rgba(255, 105, 180, 0.4);
                    background: linear-gradient(135deg, #ff1493, #ff0066);
                }

                @media (max-width: 768px) {
                    .gallery-container {
                        width: 95vw;
                        height: 65vh;
                    }

                    .carousel-item {
                        width: 90%;
                        height: 90%;
                        padding: 10px;
                    }

                    .nav-btn {
                        width: 50px;
                        height: 50px;
                        font-size: 1.3em;
                    }

                    .prev-btn {
                        left: 10px;
                    }

                    .next-btn {
                        right: 10px;
                    }

                    .caption {
                        opacity: 1;
                        transform: translateY(0);
                        transition: transform 0.35s ease, opacity 0.35s ease;
                        will-change: transform;
                    }

                    .counter {
                        top: 15px;
                        right: 15px;
                        padding: 8px 16px;
                        font-size: 0.85rem;
                    }

                    .finish-gallery-btn {
                        bottom: 20px;
                        right: 20px;
                        padding: 12px 22px;
                        font-size: 0.9rem;
                    }
                }

                @media (max-width: 480px) {
                    .gallery-container {
                        height: 60vh;
                    }

                    .nav-btn {
                        width: 45px;
                        height: 45px;
                        font-size: 1.2em;
                    }

                    .caption {
                        font-size: 0.9rem;
                        padding: 12px 18px;
                    }

                    .finish-gallery-btn {
                        padding: 10px 18px;
                        font-size: 0.85rem;
                    }
                }
            </style>
        `;

        // Initialize the gallery
        return initGallery(memories);

    } catch (error) {
        console.error("Error in gallery:", error);
        // Show error message
        app.innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; padding: 40px; text-align: center;">
                <h2 style="color: #ff69b4; margin-bottom: 20px;">Memory Gallery</h2>
                <p style="opacity: 0.7; margin: 20px 0;">Unable to load the gallery. ${error.message}</p>
                <button class="primary-btn" onclick="window.dispatchEvent(new Event('birthday:finish'))" style="
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #ff69b4, #ff1493);
                    color: white;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    <i class="fa-solid fa-heart"></i> Finish Anyway
                </button>
            </div>
        `;
        return () => {};
    }

    function initGallery(memories) {
        const carouselInner = document.querySelector('.carousel-inner');
        const caption = document.querySelector('.caption');
        const counter = document.querySelector('.counter');
        const finishBtn = document.querySelector('.finish-gallery-btn');

        let items = [];
        let currentIndex = 0;
        let hasInteracted = false;

        // Create carousel items
        memories.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'carousel-item';
            itemEl.dataset.index = index;
            itemEl.dataset.caption = item.caption;

            // Create image container
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';

            // Create image element
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.caption;
            img.style.cssText = `
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
                object-fit: contain;
                border-radius: 10px;
                display: block;
            `;

            // Preload image with error handling
            const preloadImg = new Image();
            preloadImg.src = item.image;
            preloadImg.onload = () => {
                console.log(`Image ${index + 1} loaded successfully`);
                // If image is too small, add some styling
                if (preloadImg.width < 400 || preloadImg.height < 300) {
                    img.style.border = '1px solid #eee';
                    img.style.padding = '10px';
                    img.style.backgroundColor = '#f9f9f9';
                }
            };
            preloadImg.onerror = () => {
                console.error(`Failed to load image ${index + 1}: ${item.image}`);
                imageContainer.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ff69b4; padding: 20px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">📷</div>
                        <div style="font-size: 1.2rem; font-weight: 600;">Memory ${index + 1}</div>
                        <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">${item.caption}</div>
                    </div>
                `;
            };

            imageContainer.appendChild(img);
            itemEl.appendChild(imageContainer);

            // Set positions
            if (index === 0) {
                itemEl.classList.add('active');
            } else if (index === 1) {
                itemEl.classList.add('next');
            } else if (index === memories.length - 1) {
                itemEl.classList.add('prev');
            }

            carouselInner.appendChild(itemEl);
            items.push(itemEl);
        });

        // Initialize caption and counter
        updateDisplay();

        // Navigation functions
        function goToIndex(index) {
            // Remove classes from all
            items.forEach(item => item.classList.remove('active', 'prev', 'next'));

            // Set new active
            const newIndex = ((index % memories.length) + memories.length) % memories.length;
            items[newIndex].classList.add('active');

            // Set previous and next
            const prevIndex = (newIndex - 1 + memories.length) % memories.length;
            const nextIndex = (newIndex + 1) % memories.length;

            items[prevIndex].classList.add('prev');
            items[nextIndex].classList.add('next');

            // Update display
            currentIndex = newIndex;
            updateDisplay();

            // Show finish button after first interaction
            if (!hasInteracted) {
                setTimeout(() => {
                    finishBtn.classList.add('visible');
                }, 500);
                hasInteracted = true;
            }
        }

        function updateDisplay() {
            // Update caption
            const captionText = items[currentIndex].dataset.caption;
            caption.textContent = captionText;
            caption.classList.add('visible');

            // Update counter
            counter.textContent = `${currentIndex + 1} / ${memories.length}`;

            // Remove visible class after animation

        }

        // Button click handlers
        document.querySelector('.next-btn').addEventListener('click', () => {
            goToIndex(currentIndex + 1);
        });

        document.querySelector('.prev-btn').addEventListener('click', () => {
            goToIndex(currentIndex - 1);
        });

        // Click on image to advance
        carouselInner.addEventListener('click', (e) => {
            if (e.target.closest('.carousel-item')) {
                goToIndex(currentIndex + 1);
            }
        });

        // Swipe gesture support
        let startX = 0;
        let startY = 0;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Only horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left → next
                    goToIndex(currentIndex + 1);
                } else {
                    // Swipe right → previous
                    goToIndex(currentIndex - 1);
                }
            }
        };
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);

        // Keyboard navigation
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                goToIndex(currentIndex + 1);
            } else if (e.key === 'ArrowLeft') {
                goToIndex(currentIndex - 1);
            }
        };
        document.addEventListener('keydown', handleKeyDown);


        // Finish button click
        finishBtn.addEventListener('click', () => {
            console.log("Finish button clicked");
            endProject();
        });

        // Show finish button after 10 seconds if no interaction
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }
}
