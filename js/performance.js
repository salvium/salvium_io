// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/salvium/js/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Preload critical resources
function preloadCriticalResources() {
    const resources = [
        { url: '/salvium/images/newimages/Page%20Headers/Blog%20Header-320.webp', type: 'image' },
        { url: '/salvium/css/styles.css', type: 'style' },
        { url: '/salvium/js/image-loader.js', type: 'script' }
    ];

    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.url;
        link.as = resource.type;
        if (resource.type === 'image') {
            link.type = 'image/webp';
        }
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
function initPerformance() {
    // Remove particles.js on mobile
    if (window.innerWidth < 768) {
        const particles = document.getElementById('particles');
        if (particles) {
            particles.remove();
        }
    }

    // Lazy load AOS
    const aosScript = document.querySelector('script[src*="aos.js"]');
    if (aosScript) {
        aosScript.setAttribute('defer', '');
    }

    // Add resource hints
    const hints = [
        { rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' },
        { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com' }
    ];

    hints.forEach(hint => {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        document.head.appendChild(link);
    });
}

// Initialize immediately
preloadCriticalResources();
initPerformance();
