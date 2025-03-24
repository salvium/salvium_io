(()=>{document.addEventListener("DOMContentLoaded",async function(){let a=document.getElementById("blog-search"),s=document.getElementById("blog-grid");if(!a||!s)return;let l=s.innerHTML,c=window.jekyllPaths?.root||"",r=[];try{let t=await fetch(`${c}/posts.json`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);r=(await t.json()).posts}catch(t){console.error("Error loading posts data:",t);return}function i(t){if(t=t.toLowerCase().trim(),!t){s.innerHTML=l;return}let n=r.filter(e=>e.title.toLowerCase().includes(t)||e.excerpt.toLowerCase().includes(t)||e.categories&&e.categories.toLowerCase().includes(t));n.length>0?s.innerHTML=n.map(e=>`
                <a href="${e.url}" class="group">
                    <article class="bg-[#2a2a2a] rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                        ${e.image?`
                        <div class="aspect-w-16 aspect-h-9">
                            <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover">
                        </div>
                        `:""}
                        <div class="p-6">
                            ${e.categories?`
                            <div class="mb-4">
                                <span class="blog-tag bg-[#00bfa5]/10 text-[#40E0D0] px-3 py-1 rounded-md text-sm">
                                    ${e.categories}
                                </span>
                            </div>
                            `:""}
                            <h2 class="text-xl font-bold text-white mb-3 group-hover:text-[#40E0D0] transition-colors duration-200">${e.title}</h2>
                            <p class="text-gray-400 mb-4 line-clamp-3">${e.excerpt}</p>
                            <div class="flex items-center justify-between">
                                <time datetime="${e.date}" class="text-sm text-gray-500">${e.date}</time>
                                <span class="inline-flex items-center text-[#40E0D0] font-medium group-hover:text-white transition-colors duration-200">
                                    Read More 
                                    <i class="fas fa-chevron-down ml-2 text-sm transition-transform duration-200 group-hover:translate-y-1"></i>
                                </span>
                            </div>
                        </div>
                    </article>
                </a>
            `).join(""):s.innerHTML=`
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl text-white mb-2">No posts found</h3>
                    <p class="text-gray-400">Try adjusting your search terms</p>
                </div>
            `}let o;a.addEventListener("input",function(t){clearTimeout(o),o=setTimeout(()=>{i(t.target.value)},300)}),a.addEventListener("keydown",function(t){t.key==="Escape"&&(this.value="",i(""),this.blur())})});})();
