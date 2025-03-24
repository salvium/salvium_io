// Blog post data structure
const blogPosts = [
    {
        id: 'desktop-gui-wallet-launch',
        title: 'Desktop GUI Wallet Launch',
        date: 'January 10, 2024'
    },
    {
        id: 'new-market-dawn',
        title: 'The Dawn of a New Market',
        date: 'January 7, 2024'
    },
    {
        id: 'privacy-evolution',
        title: 'The Evolution of Privacy',
        date: 'January 5, 2024'
    },
    {
        id: 'pursuit-of-privacy-ama',
        title: 'The Pursuit of Privacy AMA',
        date: 'January 3, 2024'
    },
    {
        id: 'protocol-tx-innovation',
        title: 'Protocol_tx - The Innovation Powering Salvium\'s Blockchain Future',
        date: 'January 1, 2024'
    },
    {
        id: 'redefining-cryptocurrency-landscape',
        title: 'Redefining the Cryptocurrency Landscape',
        date: 'December 30, 2023'
    },
    {
        id: 'protocol-audit',
        title: 'Protocol Audit',
        date: 'December 28, 2023'
    },
    {
        id: 'treasury-update',
        title: 'Treasury Update',
        date: 'December 26, 2023'
    },
    {
        id: 'v06-difficulty-algorithm',
        title: 'v0.6 Difficulty Algorithm',
        date: 'December 24, 2023'
    }
];

// Function to get current blog post index
function getCurrentBlogIndex() {
    const currentPath = window.location.pathname;
    const currentId = currentPath.split('/').pop().replace('.html', '');
    return blogPosts.findIndex(post => post.id === currentId);
}

// Function to get previous and next posts
function getAdjacentPosts() {
    const currentIndex = getCurrentBlogIndex();
    if (currentIndex === -1) return null; // If post not found in list
    
    const totalPosts = blogPosts.length;
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : totalPosts - 1;
    const nextIndex = currentIndex < totalPosts - 1 ? currentIndex + 1 : 0;
    
    return {
        previous: blogPosts[previousIndex],
        next: blogPosts[nextIndex]
    };
}

// Function to create blog navigation HTML
function createBlogNavigation() {
    const adjacentPosts = getAdjacentPosts();
    if (!adjacentPosts) return; // Exit if current post not found
    
    // Check if navigation already exists
    if (document.querySelector('.blog-navigation')) return;
    
    const { previous, next } = adjacentPosts;
    
    const navigationHTML = `
        <nav class="blog-navigation" data-aos="fade-up">
            <div class="blog-nav-grid">
                <a href="../blog_pages/${previous.id}.html" class="blog-nav-card">
                    <div class="blog-nav-label">
                        <i class="fas fa-arrow-left"></i>
                        Previous Post
                    </div>
                    <div class="blog-nav-title">${previous.title}</div>
                </a>
                <a href="../blog_pages/${next.id}.html" class="blog-nav-card">
                    <div class="blog-nav-label">
                        Next Post
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="blog-nav-title">${next.title}</div>
                </a>
            </div>
        </nav>
    `;
    
    // Insert navigation before the footer
    const footer = document.getElementById('footer');
    if (footer) {
        footer.insertAdjacentHTML('beforebegin', navigationHTML);
    }
}

// Initialize blog navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', createBlogNavigation);
