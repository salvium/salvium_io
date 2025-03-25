// Function to create a blog post card
function createBlogPostCard(post) {
    const imagePath = post.image;
    const imageBase = imagePath.replace(/\.[^/.]+$/, ''); // Remove extension
    
    return `
        <article class="blog-card" data-aos="fade-up">
            <div class="blog-post-image-container">
                <picture>
                    <source
                        srcset="${imageBase}-640.webp 640w,
                                ${imageBase}-1024.webp 1024w,
                                ${imageBase}-1920.webp 1920w"
                        sizes="(max-width: 640px) 640px,
                               (max-width: 1024px) 1024px,
                               1920px"
                        type="image/webp">
                    <img 
                        class="blog-post-image"
                        data-src="${imageBase}-optimized.jpg"
                        alt="${post.title}"
                        width="800"
                        height="450"
                        loading="lazy">
                </picture>
            </div>
            <div class="blog-card__content">
                <h2 class="blog-card__title">${post.title}</h2>
                <p class="blog-card__excerpt">${post.excerpt}</p>
                <div class="blog-card__meta">
                    <span class="blog-card__date">${post.date}</span>
                    <span class="blog-card__author">${post.author}</span>
                </div>
                <a href="${post.url}" class="blog-card__link">Read More</a>
            </div>
        </article>
    `;
}

// Function to populate the blog grid
function populateBlogGrid(posts) {
    const grid = document.querySelector('.blog-grid');
    if (!grid) return;
    
    const html = posts.map(post => createBlogPostCard(post)).join('');
    grid.innerHTML = html;
    
    // Initialize lazy loading for the new images
    const images = grid.querySelectorAll('.blog-post-image');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload first batch of images
    preloadNextImages();
}

// Example blog posts data (replace with your actual data source)
const blogPosts = [
    {
        title: "The Evolution of Privacy",
        excerpt: "Exploring how privacy has evolved in the blockchain space...",
        date: "2024-01-15",
        author: "Salvium Team",
        image: "/salvium/images/blog/privacy-evolution.jpg",
        url: "/salvium/blog/privacy-evolution"
    },
    // Add more blog posts here
];

// Initialize the blog grid when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    populateBlogGrid(blogPosts);
});
