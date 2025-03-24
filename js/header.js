document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in a blog page and on GitHub Pages
    const currentPath = window.location.pathname;
    const isGitHubPages = window.location.hostname.includes('github.io');
    const isLocalhost = window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('localhost');
    const baseUrl = isGitHubPages || isLocalhost ? '/final-salvium' : '';
    const imagePath = (isGitHubPages || isLocalhost) ? `${baseUrl}/images/` : 'images/';

    // Add font imports if they don't exist
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Josefin+Sans"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(fontLink);
    }

    // Add font styles
    const fontStyles = document.createElement('style');
    fontStyles.textContent = `
        .nav-fixed button, .nav-fixed a {
            font-family: var(--font-heading) !important;
        }
    `;
    document.head.appendChild(fontStyles);

    const headerHtml = `
    <nav class="nav-fixed fixed w-full z-50" style="background: rgba(30, 30, 30, 0.98); backdrop-filter: blur(8px); height: 4rem;">
        <div class="container mx-auto px-4 h-full">
            <div class="flex justify-between items-center h-full">
                <!-- Logo -->
                <a href="${baseUrl}/" class="flex items-center">
                    <img src="${imagePath}salvium_wordmark_white_512x512px_transparent.webp" alt="Salvium Logo" class="w-24 opacity-100" style="height: auto;">
                </a>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <!-- Get Started Dropdown -->
                    <div class="relative dropdown-container">
                        <button class="flex items-center dropdown-button space-x-2" style="color: #40E0D0; font-family: var(--font-heading)">
                            <span>Get Started</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="dropdown-menu absolute left-0 mt-2 w-48 rounded-lg shadow-xl hidden" style="background: rgba(30, 30, 30, 0.98);">
                            <div class="py-2">
                                <a href="${baseUrl}/exchanges.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Exchanges</a>
                                <a href="${baseUrl}/about.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">About</a>
                                <a href="${baseUrl}/papers.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Lite Paper</a>
                                <a href="${baseUrl}/download.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Downloads</a>
                            </div>
                        </div>
                    </div>

                    <!-- Knowledge Dropdown -->
                    <div class="relative dropdown-container">
                        <button class="flex items-center dropdown-button space-x-2" style="color: #40E0D0; font-family: var(--font-heading)">
                            <span>Knowledge</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="dropdown-menu absolute left-0 mt-2 w-48 rounded-lg shadow-xl hidden" style="background: rgba(30, 30, 30, 0.98);">
                            <div class="py-2">
                                <a href="${baseUrl}/blog" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Blog</a>
                                <a href="${baseUrl}/faq.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">FAQ</a>
                                <a href="https://siko-ctrl.github.io/docs-salvium/" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Knowledge Base</a>
                                <a href="${baseUrl}/roadmap.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Roadmap</a>
                            </div>
                        </div>
                    </div>

                    <!-- Tools Dropdown -->
                    <div class="relative dropdown-container">
                        <button class="flex items-center dropdown-button space-x-2" style="color: #40E0D0; font-family: var(--font-heading)">
                            <span>Tools</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="dropdown-menu absolute left-0 mt-2 w-48 rounded-lg shadow-xl hidden" style="background: rgba(30, 30, 30, 0.98);">
                            <div class="py-2">
                                <a href="${baseUrl}/tools.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Tools Overview</a>
                                <a href="${baseUrl}/pools.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Mining Pools</a>
                                <a href="${baseUrl}/stats.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Statistics</a>
                            </div>
                        </div>
                    </div>

                    <!-- Get Involved Dropdown -->
                    <div class="relative dropdown-container">
                        <button class="flex items-center dropdown-button space-x-2" style="color: #40E0D0; font-family: var(--font-heading)">
                            <span>Get Involved</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="dropdown-menu absolute left-0 mt-2 w-48 rounded-lg shadow-xl hidden" style="background: rgba(30, 30, 30, 0.98);">
                            <div class="py-2">
                                <a href="${baseUrl}/community.html" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Community</a>
                                <a href="https://github.com/siko-ctrl/final-salvium" class="block px-4 py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu Button -->
                <div class="md:hidden">
                    <button id="mobile-menu-button" class="transition-colors p-2" style="color: #40E0D0; font-family: var(--font-heading)" data-mobile-menu>
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden hidden fixed w-full top-16 left-0 right-0" style="background: rgba(30, 30, 30, 0.98); backdrop-filter: blur(8px);" id="mobile-menu" data-mobile-menu-panel>
            <div class="px-4 py-3 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <!-- Get Started Section -->
                <div class="mobile-dropdown">
                    <button class="w-full flex justify-between items-center text-[#40E0D0] py-2.5 mobile-dropdown-button" style="font-family: var(--font-heading)">
                        <span>Get Started</span>
                        <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-menu hidden pl-4 pb-2 space-y-2">
                        <a href="${baseUrl}/exchanges.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Exchanges</a>
                        <a href="${baseUrl}/about.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">About</a>
                        <a href="${baseUrl}/papers.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Lite Paper</a>
                        <a href="${baseUrl}/download.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Downloads</a>
                    </div>
                </div>

                <!-- Knowledge Section -->
                <div class="mobile-dropdown">
                    <button class="w-full flex justify-between items-center text-[#40E0D0] py-2.5 mobile-dropdown-button" style="font-family: var(--font-heading)">
                        <span>Knowledge</span>
                        <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-menu hidden pl-4 pb-2 space-y-2">
                        <a href="${baseUrl}/blog" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Blog</a>
                        <a href="${baseUrl}/faq.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">FAQ</a>
                        <a href="https://siko-ctrl.github.io/docs-salvium/" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Knowledge Base</a>
                        <a href="${baseUrl}/roadmap.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Roadmap</a>
                    </div>
                </div>

                <!-- Tools Section -->
                <div class="mobile-dropdown">
                    <button class="w-full flex justify-between items-center text-[#40E0D0] py-2.5 mobile-dropdown-button" style="font-family: var(--font-heading)">
                        <span>Tools</span>
                        <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-menu hidden pl-4 pb-2 space-y-2">
                        <a href="${baseUrl}/tools.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Tools Overview</a>
                        <a href="${baseUrl}/pools.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Mining Pools</a>
                        <a href="${baseUrl}/stats.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Statistics</a>
                    </div>
                </div>

                <!-- Get Involved Section -->
                <div class="mobile-dropdown">
                    <button class="w-full flex justify-between items-center text-[#40E0D0] py-2.5 mobile-dropdown-button" style="font-family: var(--font-heading)">
                        <span>Get Involved</span>
                        <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-menu hidden pl-4 pb-2 space-y-2">
                        <a href="${baseUrl}/community.html" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">Community</a>
                        <a href="https://github.com/siko-ctrl/final-salvium" class="block py-2.5 transition-all duration-200 hover:bg-[#40E0D0]/10" style="color: #40E0D0; font-family: var(--font-heading)">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;

    // Insert the header HTML
    document.body.insertAdjacentHTML('afterbegin', headerHtml);

    // Function to initialize dropdowns
    function initializeDropdowns() {
        // Desktop dropdowns
        document.querySelectorAll('.dropdown-container').forEach(dropdown => {
            const button = dropdown.querySelector('.dropdown-button');
            const menu = dropdown.querySelector('.dropdown-menu');

            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = !menu.classList.contains('hidden');
                
                // Close all other dropdowns first
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu && !otherMenu.classList.contains('hidden')) {
                        otherMenu.classList.add('hidden');
                    }
                });

                menu.classList.toggle('hidden');
                
                // Add active state to button
                button.classList.toggle('text-[#40E0D0]/80', !isActive);
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (!menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                }
            });
        });

        // Mobile menu
        const mobileMenuButton = document.querySelector('[data-mobile-menu]');
        const mobileMenuPanel = document.querySelector('[data-mobile-menu-panel]');

        if (mobileMenuButton && mobileMenuPanel) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenuPanel.classList.toggle('hidden');
            });
        }

        // Mobile dropdowns
        document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
            const button = dropdown.querySelector('.mobile-dropdown-button');
            const menu = dropdown.querySelector('.mobile-dropdown-menu');
            const icon = button.querySelector('svg');

            button.addEventListener('click', () => {
                // Close all other mobile dropdown menus first
                document.querySelectorAll('.mobile-dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu && !otherMenu.classList.contains('hidden')) {
                        otherMenu.classList.add('hidden');
                        const otherIcon = otherMenu.parentElement.querySelector('svg');
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });

                menu.classList.toggle('hidden');
                if (icon) {
                    icon.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            });
        });
    }

    // Initialize dropdowns
    initializeDropdowns();
});
