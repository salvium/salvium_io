(()=>{document.addEventListener("DOMContentLoaded",function(){let s=window.location.pathname,l=window.location.hostname.includes("github.io"),t="",i=`
    <footer class="border-t border-[#40E0D0]/10 mt-0 pt-16">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div class="text-center">
                    <img src="${`${t}/images/`}salvium_coin_square_white_512x512px_transparent.webp" 
                         alt="Salvium Logo" 
                         style="height: 80px; width: auto;" 
                         class="mb-6 mx-auto">
                    <p class="text-white max-w-md mx-auto mb-6 font-arial">Private blockchain with DeFi</p>
                    <!-- Social Icons -->
                    <div class="flex justify-center space-x-6">
                        <a href="https://x.com/salvium_io" class="hover:opacity-80 transition-opacity">
                            <i class="fa-brands fa-x-twitter text-2xl" style="color: #40E0D0 !important;"></i>
                        </a>
                        <a href="https://t.me/salviumcommunity" class="hover:opacity-80 transition-opacity">
                            <i class="fa-brands fa-telegram text-2xl" style="color: #40E0D0 !important;"></i>
                        </a>
                        <a href="https://discord.gg/salvium" class="hover:opacity-80 transition-opacity">
                            <i class="fa-brands fa-discord text-2xl" style="color: #40E0D0 !important;"></i>
                        </a>
                        <a href="https://github.com/salvium" class="hover:opacity-80 transition-opacity">
                            <i class="fa-brands fa-github text-2xl" style="color: #40E0D0 !important;"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="text-lg font-josefin font-semibold mb-4 text-[#40E0D0]">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="${t}/about.html" style="color: #40E0D0 !important;" class="hover:text-[#40E0D0]/80 transition-colors font-arial">About Us</a></li>
                        <li><a href="${t}/blog" style="color: #40E0D0 !important;" class="hover:text-[#40E0D0]/80 transition-colors font-arial">Blog</a></li>
                        <li><a href="${t}/faq.html" style="color: #40E0D0 !important;" class="hover:text-[#40E0D0]/80 transition-colors font-arial">FAQ</a></li>
                        <li><a href="${t}/exchanges.html" style="color: #40E0D0 !important;" class="hover:text-[#40E0D0]/80 transition-colors font-arial">Exchanges</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-josefin font-semibold mb-4 text-[#40E0D0]">Tools</h4>
                    <ul class="space-y-2">
                        <li><a href="${t}/download.html" style="color: #40E0D0 !important;" class="hover:text-[#40E0D0]/80 transition-colors font-arial">Wallets</a></li>
                        <li><a href="https://explorer.salvium.io/" style="color: #40E0D0 !important;" class="hover:text-[#40E0D0]/80 transition-colors font-arial">Explorer</a></li>
                        <li><a href="${t}/stats.html" style="color: #40E0D0 !important;" class="hover:text-[#40E0D0]/80 transition-colors font-arial">Stats</a></li>
                        <li><a href="${t}/tools.html" style="color: #40E0D0 !important;" class="hover:text-[#40E0D0]/80 transition-colors font-arial">3rd Party Tools</a></li>
                    </ul>
                </div>
            </div>
            <div class="text-center text-white text-sm">
                <p class="font-arial">&copy; ${new Date().getFullYear()} Salvium Protocol. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `,o=document.querySelector("footer");o&&o.remove();let a=document.getElementById("footer");a&&(a.innerHTML=i)});})();
