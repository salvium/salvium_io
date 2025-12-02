document.addEventListener('DOMContentLoaded', function () {
    // Function to initialize dropdowns
    function initializeDropdowns() {
        // Desktop dropdowns
        document.querySelectorAll('.dropdown-container').forEach(dropdown => {
            const button = dropdown.querySelector('.dropdown-button');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (!button || !menu) return;

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

            if (!button || !menu) return;

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
