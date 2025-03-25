// Component loading system
document.addEventListener('DOMContentLoaded', async () => {
    // Load header
    const headerContainer = document.getElementById('header');
    if (headerContainer) {
        try {
            const response = await fetch('../components/header.html');
            const html = await response.text();
            headerContainer.innerHTML = html;
            
            // Initialize mobile menu
            const mobileMenuButton = document.querySelector('[data-mobile-menu]');
            const mobileMenu = document.querySelector('[data-mobile-menu-panel]');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
                    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
                    mobileMenu.classList.toggle('hidden');
                });
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    // Load footer
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        try {
            const response = await fetch('../components/footer.html');
            const html = await response.text();
            footerContainer.innerHTML = html;
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    // Highlight current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-[#40E0D0]');
            link.classList.add('font-semibold');
        }
    });
});
