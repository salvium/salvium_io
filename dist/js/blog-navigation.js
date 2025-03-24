(()=>{var n=[{id:"desktop-gui-wallet-launch",title:"Desktop GUI Wallet Launch",date:"January 10, 2024"},{id:"new-market-dawn",title:"The Dawn of a New Market",date:"January 7, 2024"},{id:"privacy-evolution",title:"The Evolution of Privacy",date:"January 5, 2024"},{id:"pursuit-of-privacy-ama",title:"The Pursuit of Privacy AMA",date:"January 3, 2024"},{id:"protocol-tx-innovation",title:"Protocol_tx - The Innovation Powering Salvium's Blockchain Future",date:"January 1, 2024"},{id:"redefining-cryptocurrency-landscape",title:"Redefining the Cryptocurrency Landscape",date:"December 30, 2023"},{id:"protocol-audit",title:"Protocol Audit",date:"December 28, 2023"},{id:"treasury-update",title:"Treasury Update",date:"December 26, 2023"},{id:"v06-difficulty-algorithm",title:"v0.6 Difficulty Algorithm",date:"December 24, 2023"}];function r(){let e=window.location.pathname.split("/").pop().replace(".html","");return n.findIndex(a=>a.id===e)}function l(){let t=r();if(t===-1)return null;let e=n.length,a=t>0?t-1:e-1,i=t<e-1?t+1:0;return{previous:n[a],next:n[i]}}function d(){let t=l();if(!t||document.querySelector(".blog-navigation"))return;let{previous:e,next:a}=t,i=`
        <nav class="blog-navigation" data-aos="fade-up">
            <div class="blog-nav-grid">
                <a href="../blog_pages/${e.id}.html" class="blog-nav-card">
                    <div class="blog-nav-label">
                        <i class="fas fa-arrow-left"></i>
                        Previous Post
                    </div>
                    <div class="blog-nav-title">${e.title}</div>
                </a>
                <a href="../blog_pages/${a.id}.html" class="blog-nav-card">
                    <div class="blog-nav-label">
                        Next Post
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="blog-nav-title">${a.title}</div>
                </a>
            </div>
        </nav>
    `,o=document.getElementById("footer");o&&o.insertAdjacentHTML("beforebegin",i)}document.addEventListener("DOMContentLoaded",d);})();
