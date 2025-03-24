document.addEventListener('DOMContentLoaded', async function() {
    const searchInput = document.getElementById('blog-search');
    const blogGrid = document.getElementById('blog-grid');
    
    if (!searchInput || !blogGrid) return;

    // Store the original content
    const originalContent = blogGrid.innerHTML;

    // Get the base URL from window.jekyllPaths
    const baseUrl = window.jekyllPaths?.root || '';

    // Fetch all posts data
    let allPosts = [];
    try {
        const response = await fetch(`${baseUrl}/posts.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allPosts = data.posts;
    } catch (error) {
        console.error('Error loading posts data:', error);
        return;
    }

    function filterPosts(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        
        if (!searchTerm) {
            blogGrid.innerHTML = originalContent;
            return;
        }

        const filteredPosts = allPosts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm) || 
                   post.excerpt.toLowerCase().includes(searchTerm) || 
                   (post.categories && post.categories.toLowerCase().includes(searchTerm));
        });

        if (filteredPosts.length > 0) {
            blogGrid.innerHTML = filteredPosts.map(post => `
                <a href="${post.url}" class="group">
                    <article class="bg-[#2a2a2a] rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                        ${post.image ? `
                        <div class="aspect-w-16 aspect-h-9">
                            <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
                        </div>
                        ` : ''}
                        <div class="p-6">
                            ${post.categories ? `
                            <div class="mb-4">
                                <span class="blog-tag bg-[#00bfa5]/10 text-[#40E0D0] px-3 py-1 rounded-md text-sm">
                                    ${post.categories}
                                </span>
                            </div>
                            ` : ''}
                            <h2 class="text-xl font-bold text-white mb-3 group-hover:text-[#40E0D0] transition-colors duration-200">${post.title}</h2>
                            <p class="text-gray-400 mb-4 line-clamp-3">${post.excerpt}</p>
                            <div class="flex items-center justify-between">
                                <time datetime="${post.date}" class="text-sm text-gray-500">${post.date}</time>
                                <span class="inline-flex items-center text-[#40E0D0] font-medium group-hover:text-white transition-colors duration-200">
                                    Read More 
                                    <i class="fas fa-chevron-down ml-2 text-sm transition-transform duration-200 group-hover:translate-y-1"></i>
                                </span>
                            </div>
                        </div>
                    </article>
                </a>
            `).join('');
        } else {
            blogGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl text-white mb-2">No posts found</h3>
                    <p class="text-gray-400">Try adjusting your search terms</p>
                </div>
            `;
        }
    }

    // Add input event listener with debouncing
    let debounceTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            filterPosts(e.target.value);
        }, 300);
    });

    // Add clear search functionality
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            filterPosts('');
            this.blur();
        }
    });
});
