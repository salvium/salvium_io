document.addEventListener('DOMContentLoaded', function() {
    // Load the header
    fetch('/includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-include').innerHTML = data;
            
            // Reinitialize menu functionality
            let $menu = $('#menu');
            let $menuClose = $menu.find('.close');
            let $menuToggle = $('a[href="#menu"]');
            
            // Menu button click
            $menuToggle.click(function(event) {
                event.preventDefault();
                $menu.addClass('is-active');
            });

            // Close button click
            $menuClose.click(function(event) {
                event.preventDefault();
                $menu.removeClass('is-active');
            });
        })
        .catch(error => console.error('Error loading header:', error));
});
