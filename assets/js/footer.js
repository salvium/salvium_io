document.addEventListener('DOMContentLoaded', function() {
    const footerHtml = `
    <footer class="bg-[#0B272C] text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Logo and Description -->
                <div class="col-span-1 md:col-span-2">
                    <img src="./images/salvium_wordmark_white_1024x1024px.svg" alt="Salvium Logo" class="w-32 mb-4">
                    <p class="text-sm text-gray-400 mb-6">
                        Salvium Protocol is a decentralized finance (DeFi) platform built on blockchain technology, 
                        offering innovative financial solutions and investment opportunities.
                    </p>
                    <!-- Social Links -->
                    <div class="flex space-x-4">
                        <a href="https://x.com/salvium_io" target="_blank" class="text-[#40E0D0] hover:text-[#40E0D0]/80">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="https://t.me/salviumprotocol" target="_blank" class="text-[#40E0D0] hover:text-[#40E0D0]/80">
                            <i class="fab fa-telegram text-xl"></i>
                        </a>
                        <a href="https://discord.gg/salvium" target="_blank" class="text-[#40E0D0] hover:text-[#40E0D0]/80">
                            <i class="fab fa-discord text-xl"></i>
                        </a>
                        <a href="https://medium.com/@salviumprotocol" target="_blank" class="text-[#40E0D0] hover:text-[#40E0D0]/80">
                            <i class="fab fa-medium text-xl"></i>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-lg font-semibold mb-4 text-[#40E0D0]">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="about.html" class="text-gray-400 hover:text-[#40E0D0] transition-colors">About</a></li>
                        <li><a href="blogs.html" class="text-gray-400 hover:text-[#40E0D0] transition-colors">Blogs</a></li>
                        <li><a href="faq.html" class="text-gray-400 hover:text-[#40E0D0] transition-colors">FAQ</a></li>
                        <li><a href="exchanges.html" class="text-gray-400 hover:text-[#40E0D0] transition-colors">Exchanges</a></li>
                    </ul>
                </div>

                <!-- Community -->
                <div>
                    <h3 class="text-lg font-semibold mb-4 text-[#40E0D0]">Community</h3>
                    <ul class="space-y-2">
                        <li><a href="https://x.com/salvium_io" target="_blank" class="text-gray-400 hover:text-[#40E0D0] transition-colors">Twitter</a></li>
                        <li><a href="https://t.me/salviumprotocol" target="_blank" class="text-gray-400 hover:text-[#40E0D0] transition-colors">Telegram</a></li>
                        <li><a href="https://discord.gg/salvium" target="_blank" class="text-gray-400 hover:text-[#40E0D0] transition-colors">Discord</a></li>
                        <li><a href="https://medium.com/@salviumprotocol" target="_blank" class="text-gray-400 hover:text-[#40E0D0] transition-colors">Medium</a></li>
                    </ul>
                </div>
            </div>

            <!-- Copyright -->
            <div class="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
                <p>&copy; 2024 Salvium Protocol. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;

    // Insert the footer HTML
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        footerContainer.innerHTML = footerHtml;
    }
});
