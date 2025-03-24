// Preload an image
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Load the smallest image first
async function loadHeroImage() {
    try {
        // Start with the smallest image
        const smallImage = '/salvium/images/newimages/Page%20Headers/Blog%20Header-320.webp';
        await preloadImage(smallImage);
        
        // Then load larger image in background
        const largeImage = '/salvium/images/newimages/Page%20Headers/Blog%20Header-1024.webp';
        preloadImage(largeImage).then(() => {
            const heroImg = document.querySelector('.blog-hero__image');
            if (heroImg) {
                heroImg.src = largeImage;
            }
        });
    } catch (error) {
        console.error('Error loading hero image:', error);
    }
}

// Load CTA background image
async function loadCtaBackground() {
    try {
        // Start with tiny placeholder (already in HTML)
        
        // Load small WebP version first
        const smallImage = '/salvium/images/pools-320.webp';
        await preloadImage(smallImage);
        
        // Then load larger version
        const largeImage = '/salvium/images/pools-640.webp';
        const ctaImg = document.querySelector('.cta-section img');
        if (ctaImg) {
            ctaImg.src = smallImage;
            
            // Load larger version in background
            preloadImage(largeImage).then(() => {
                ctaImg.src = largeImage;
            });
        }
    } catch (error) {
        console.error('Error loading CTA background:', error);
    }
}

// Initialize image loading before DOM content loaded
loadHeroImage();

// Initialize after DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load CTA background when near viewport
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadCtaBackground();
                ctaObserver.disconnect();
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaObserver.observe(ctaSection);
    }

    // Handle lazy loading for other images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const parent = img.closest('picture');
                
                if (parent) {
                    // Load WebP source first if supported
                    const source = parent.querySelector('source');
                    if (source) {
                        const srcset = source.srcset.split(',')[0].trim().split(' ')[0];
                        preloadImage(srcset).then(() => {
                            img.classList.add('loaded');
                        });
                    }
                } else {
                    // Fallback to regular image
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Observe all lazy images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
});
