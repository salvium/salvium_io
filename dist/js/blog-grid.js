(()=>{function c(e){let a=e.image.replace(/\.[^/.]+$/,"");return`
        <article class="blog-card" data-aos="fade-up">
            <div class="blog-post-image-container">
                <picture>
                    <source
                        srcset="${a}-640.webp 640w,
                                ${a}-1024.webp 1024w,
                                ${a}-1920.webp 1920w"
                        sizes="(max-width: 640px) 640px,
                               (max-width: 1024px) 1024px,
                               1920px"
                        type="image/webp">
                    <img 
                        class="blog-post-image"
                        data-src="${a}-optimized.jpg"
                        alt="${e.title}"
                        width="800"
                        height="450"
                        loading="lazy">
                </picture>
            </div>
            <div class="blog-card__content">
                <h2 class="blog-card__title">${e.title}</h2>
                <p class="blog-card__excerpt">${e.excerpt}</p>
                <div class="blog-card__meta">
                    <span class="blog-card__date">${e.date}</span>
                    <span class="blog-card__author">${e.author}</span>
                </div>
                <a href="${e.url}" class="blog-card__link">Read More</a>
            </div>
        </article>
    `}function s(e){let i=document.querySelector(".blog-grid");if(!i)return;let a=e.map(t=>c(t)).join("");i.innerHTML=a;let l=i.querySelectorAll(".blog-post-image"),r=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&(loadImage(o.target),r.unobserve(o.target))})},{rootMargin:"50px 0px",threshold:.01});l.forEach(t=>r.observe(t)),preloadNextImages()}var g=[{title:"The Evolution of Privacy",excerpt:"Exploring how privacy has evolved in the blockchain space...",date:"2024-01-15",author:"Salvium Team",image:"/salvium/images/blog/privacy-evolution.jpg",url:"/salvium/blog/privacy-evolution"}];document.addEventListener("DOMContentLoaded",()=>{s(g)});})();
