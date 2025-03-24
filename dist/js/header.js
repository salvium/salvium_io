(()=>{document.addEventListener("DOMContentLoaded",function(){let a=window.location.pathname.includes("/blog/"),o="",t=`${o}/images/`,n=`
    <nav class="nav-fixed fixed w-full z-50" style="background: rgba(30, 30, 30, 0.98); backdrop-filter: blur(8px); height: 4rem;">
        <div class="container mx-auto px-4 h-full">
            <div class="flex justify-between items-center h-full">
                <!-- Logo -->
                <a href="${o}/" class="flex items-center">
                    <img src="${t}salvium_wordmark_white_512x512px_transparent.webp" alt="Salvium Logo" class="w-24 opacity-100" style="height: auto;">
                </a>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <!-- Get Started Dropdown -->
                    <div class="relative dropdown-container font-body">
                        <button class="flex items-center dropdown-button font-josefin" style="color: #40E0D0">
                            Get Started
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="dropdown-menu absolute left-0 mt-2 w-48 rounded-lg shadow-xl hidden" style="background: rgba(30, 30, 30, 0.98);">
                            <div class="py-1">
                                <a href="${o}/exchanges.html" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Exchanges</a>
                                <a href="${o}/about.html" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">About</a>
                                <a href="${o}/papers.html" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Lite Paper</a>
                                <a href="${o}/download.html" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Downloads</a>
                            </div>
                        </div>
                    </div>

                    <!-- Knowledge Dropdown -->
                    <div class="relative dropdown-container font-body">
                        <button class="flex items-center dropdown-button font-josefin" style="color: #40E0D0">
                            Knowledge
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="dropdown-menu absolute left-0 mt-2 w-48 rounded-lg shadow-xl hidden" style="background: rgba(30, 30, 30, 0.98);">
                            <div class="py-1">
                                <a href="${o}/blog" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Blog</a>
                                <a href="${o}/faq.html" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">FAQ</a>
                                <a href="https://siko-ctrl.github.io/docs-salvium/" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Knowledge Base</a>
                                <a href="${o}/roadmap.html" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Roadmap</a>
                            </div>
                        </div>
                    </div>

                    <!-- Tools Dropdown -->
                    <div class="relative dropdown-container font-body">
                        <button class="flex items-center dropdown-button font-josefin" style="color: #40E0D0">
                            Tools
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="dropdown-menu absolute left-0 mt-2 w-48 rounded-lg shadow-xl hidden" style="background: rgba(30, 30, 30, 0.98);">
                            <div class="py-1">
                                <a href="${o}/stats.html" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Stats</a>
                                <a href="https://explorer.salvium.io/" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Explorer</a>
                                <a href="${o}/tools.html" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">3rd Party Tools</a>
                            </div>
                        </div>
                    </div>

                    <!-- Get Involved Dropdown -->
                    <div class="relative dropdown-container font-body">
                        <button class="flex items-center dropdown-button font-josefin" style="color: #40E0D0">
                            Get Involved
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="dropdown-menu absolute left-0 mt-2 w-48 rounded-lg shadow-xl hidden" style="background: rgba(30, 30, 30, 0.98);">
                            <div class="py-1">
                                <a href="${o}/community.html" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Community</a>
                                <a href="https://github.com/salvium" class="block px-4 py-2 transition-all duration-200 font-arial" style="color: #40E0D0">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu Button -->
                <div class="md:hidden">
                    <button id="mobile-menu-button" class="transition-colors" style="color: #40E0D0" data-mobile-menu>
                        <svg class="w-6 h-6 hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden hidden fixed w-full top-16 left-0 right-0" style="background: rgba(30, 30, 30, 0.98); backdrop-filter: blur(8px);" id="mobile-menu" data-mobile-menu-panel>
            <div class="px-4 py-3 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <!-- Get Started Section -->
                <div class="mobile-dropdown">
                    <button class="w-full flex justify-between items-center text-[#40E0D0] py-2 mobile-dropdown-button font-josefin">
                        <span>Get Started</span>
                        <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-menu hidden pl-4 pb-2">
                        <a href="${o}/exchanges.html" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Exchanges</a>
                        <a href="${o}/about.html" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">About</a>
                        <a href="${o}/papers.html" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Lite Paper</a>
                        <a href="${o}/download.html" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Downloads</a>
                    </div>
                </div>

                <!-- Knowledge Section -->
                <div class="mobile-dropdown">
                    <button class="w-full flex justify-between items-center text-[#40E0D0] py-2 mobile-dropdown-button font-josefin">
                        <span>Knowledge</span>
                        <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-menu hidden pl-4 pb-2">
                        <a href="${o}/blog" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Blog</a>
                        <a href="${o}/faq.html" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">FAQ</a>
                        <a href="https://siko-ctrl.github.io/docs-salvium/" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Knowledge Base</a>
                        <a href="${o}/roadmap.html" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Roadmap</a>
                    </div>
                </div>

                <!-- Tools Section -->
                <div class="mobile-dropdown">
                    <button class="w-full flex justify-between items-center text-[#40E0D0] py-2 mobile-dropdown-button font-josefin">
                        <span>Tools</span>
                        <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-menu hidden pl-4 pb-2">
                        <a href="${o}/stats.html" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Stats</a>
                        <a href="https://explorer.salvium.io/" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Explorer</a>
                        <a href="${o}/tools.html" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">3rd Party Tools</a>
                    </div>
                </div>

                <!-- Get Involved Section -->
                <div class="mobile-dropdown">
                    <button class="w-full flex justify-between items-center text-[#40E0D0] py-2 mobile-dropdown-button font-josefin">
                        <span>Get Involved</span>
                        <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="mobile-dropdown-menu hidden pl-4 pb-2">
                        <a href="${o}/community.html" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">Community</a>
                        <a href="https://github.com/salvium" class="block py-2 transition-all duration-200 font-arial" style="color: #40E0D0">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;document.body.insertAdjacentHTML("afterbegin",n),i()});function i(){document.querySelectorAll(".dropdown-container").forEach(t=>{let n=t.querySelector(".dropdown-button"),e=t.querySelector(".dropdown-menu");n.addEventListener("click",s=>{s.stopPropagation(),document.querySelectorAll(".dropdown-menu").forEach(l=>{l!==e&&!l.classList.contains("hidden")&&l.classList.add("hidden")}),e.classList.toggle("hidden")})});let a=document.getElementById("mobile-menu-button"),o=document.getElementById("mobile-menu");a&&o&&a.addEventListener("click",()=>{o.classList.toggle("hidden")}),document.querySelectorAll(".mobile-dropdown").forEach(t=>{let n=t.querySelector(".mobile-dropdown-button"),e=t.querySelector(".mobile-dropdown-menu");n.addEventListener("click",()=>{document.querySelectorAll(".mobile-dropdown-menu").forEach(l=>{l!==e&&!l.classList.contains("hidden")&&(l.classList.add("hidden"),l.parentElement.querySelector("svg").classList.remove("rotate-180"))}),e.classList.toggle("hidden"),n.querySelector("svg").classList.toggle("rotate-180")})}),document.addEventListener("click",()=>{document.querySelectorAll(".dropdown-menu").forEach(t=>{t.classList.contains("hidden")||t.classList.add("hidden")})})}})();
