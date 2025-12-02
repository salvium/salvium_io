/**
 * Salvium Mining Pools - Load Once on Page Load
 * Fetches pool data from APIs when page loads (no auto-refresh)
 */

(function () {
    'use strict';

    class SalviumPoolsManager {
        constructor() {
            this.poolsConfig = [
                {
                    id: 'kryptex',
                    name: 'Kryptex Pool',
                    url: 'https://pool.kryptex.com/sal',
                    apiUrl: null,
                    fee: '1%',
                    icon: 'fa-server',
                    description: 'Largest pool with PPS+ rewards and auto-exchange to BTC/USDT.',
                    delay: 0,
                    fallback: { hashrate: 'No API', miners: 'No API', blocks: 'No API' }
                },
                {
                    id: 'herominers',
                    name: 'HeroMiners',
                    url: 'https://salvium.herominers.com/',
                    apiUrl: 'https://salvium.herominers.com/api/stats',
                    apiType: 'herominers',
                    fee: '2%',
                    icon: 'fa-users',
                    description: 'Major pool with global servers. Supports pool and solo mining.',
                    delay: 100
                },
                {
                    id: 'miningocean',
                    name: 'MiningOcean',
                    url: 'https://salvium.miningocean.org/',
                    apiUrl: null,
                    fee: '0.5%',
                    icon: 'fa-water',
                    description: 'Low fee pool with PPLNS payment system and DDOS protection.',
                    delay: 200,
                    fallback: { hashrate: 'No API', miners: 'No API', blocks: 'No API' }
                },
                {
                    id: 'hashvault',
                    name: 'HashVault',
                    url: 'https://salvium.hashvault.pro/en',
                    apiUrl: 'https://api.hashvault.pro/v3/salvium',
                    apiType: 'hashvault',
                    fee: '0.9%',
                    icon: 'fa-vault',
                    description: 'PPLNS and solo mining with hourly payments and global servers.',
                    delay: 300
                },
                {
                    id: 'gntl',
                    name: 'GNTL',
                    url: 'https://sal.gntl.uk/',
                    apiUrl: null,
                    fee: '0.1%',
                    icon: 'fa-network-wired',
                    description: 'Lowest fee pool based in the UK. Community-focused with alerts.',
                    delay: 400,
                    fallback: { hashrate: 'No API', miners: 'No API', blocks: 'No API' }
                },
                {
                    id: 'p1ant',
                    name: 'P1ant.xyz',
                    url: 'https://sal.p1ant.xyz/',
                    apiUrl: null,
                    fee: '0.9%',
                    icon: 'fa-leaf',
                    description: 'Smaller pool with competitive fees. Good for decentralization.',
                    delay: 500,
                    fallback: { hashrate: 'No API', miners: 'No API', blocks: 'No API' }
                }
            ];

            this.container = document.getElementById('pools-container');
            this.updateTimeEl = document.getElementById('last-update');
        }

        formatHashrate(hashrate) {
            if (typeof hashrate === 'string') return hashrate;
            if (hashrate >= 1000000) return `${(hashrate / 1000000).toFixed(2)} MH/s`;
            if (hashrate >= 1000) return `${(hashrate / 1000).toFixed(2)} KH/s`;
            return `${hashrate.toFixed(2)} H/s`;
        }

        async fetchHashVaultData(apiUrl) {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('API request failed');
                const data = await response.json();

                return {
                    hashrate: this.formatHashrate(data.pool_statistics?.collective?.hashRate || 0),
                    miners: (data.pool_statistics?.collective?.miners || 0).toString(),
                    blocks: (data.pool_statistics?.collective?.totalBlocksFound || 0).toString()
                };
            } catch (error) {
                console.warn('HashVault API error:', error);
                return null;
            }
        }

        async fetchHeroMinersData(apiUrl) {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('API request failed');
                const data = await response.json();

                return {
                    hashrate: this.formatHashrate(data.pool?.hashrate || 0),
                    miners: (data.pool?.miners || 0).toString(),
                    blocks: (data.pool?.totalBlocks || 0).toString()
                };
            } catch (error) {
                console.warn('HeroMiners API error:', error);
                return null;
            }
        }

        async fetchPoolData(pool) {
            // No API = use fallback
            if (!pool.apiUrl) {
                return pool.fallback;
            }

            // Fetch based on API type
            let data = null;
            switch (pool.apiType) {
                case 'hashvault':
                    data = await this.fetchHashVaultData(pool.apiUrl);
                    break;
                case 'herominers':
                    data = await this.fetchHeroMinersData(pool.apiUrl);
                    break;
                default:
                    data = pool.fallback;
            }

            // Use fallback if fetch failed
            return data || pool.fallback;
        }

        renderPoolCard(pool, liveData) {
            const data = liveData || pool.fallback || { hashrate: 'N/A', miners: 'N/A', blocks: 'N/A' };

            return `
        <div class="ecosystem-card" data-aos="fade-up" data-aos-delay="${pool.delay}">
          <div class="card-content">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-[#40E0D0]/10 flex items-center justify-center">
              <i class="fas ${pool.icon} text-3xl text-[#40E0D0]"></i>
            </div>
            <span class="card-tag">Mining Pool</span>
            <h2 class="card-title text-center">${pool.name}</h2>
            <p class="card-description text-center">
              ${pool.description}
            </p>
            <div class="stats-container rounded-lg p-4 mb-6">
              <div class="flex justify-between items-center mb-3 pb-2 border-b border-[#40E0D0]/10">
                <span class="text-gray-400">Hashrate</span>
                <span class="text-[#40E0D0] font-semibold">${data.hashrate}</span>
              </div>
              <div class="flex justify-between items-center mb-3 pb-2 border-b border-[#40E0D0]/10">
                <span class="text-gray-400">Miners</span>
                <span class="text-[#40E0D0] font-semibold">${data.miners}</span>
              </div>
              <div class="flex justify-between items-center mb-3 pb-2 border-b border-[#40E0D0]/10">
                <span class="text-gray-400">Fee</span>
                <span class="text-[#40E0D0] font-semibold">${pool.fee} PROP</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Blocks Found</span>
                <span class="text-[#40E0D0] font-semibold">${data.blocks}</span>
              </div>
            </div>
            <a href="${pool.url}" target="_blank" rel="noopener"
               class="card-link text-center block">
              Start Mining
            </a>
          </div>
        </div>
      `;
        }

        async render() {
            try {
                // Fetch all pool data in parallel
                const dataPromises = this.poolsConfig.map(pool => this.fetchPoolData(pool));
                const liveData = await Promise.all(dataPromises);

                // Generate HTML
                const poolsHTML = this.poolsConfig
                    .map((pool, index) => this.renderPoolCard(pool, liveData[index]))
                    .join('');

                // Update DOM
                if (this.container) {
                    this.container.innerHTML = poolsHTML;
                }

                // Update timestamp
                if (this.updateTimeEl) {
                    const now = new Date();
                    const timeString = now.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    this.updateTimeEl.innerHTML = `<span class="inline-block text-green-400">●</span> Data loaded: ${timeString}`;
                }

                // Re-initialize AOS animations
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            } catch (error) {
                console.error('Error rendering pools:', error);
                if (this.container) {
                    this.container.innerHTML = `
            <div class="col-span-full text-center py-12">
              <p class="text-red-400 mb-4">Unable to load pool data</p>
              <button onclick="location.reload()" class="text-[#40E0D0] hover:underline">
                Click to retry
              </button>
            </div>
          `;
                }
            }
        }

        async init() {
            await this.render();
        }
    }

    // Initialize when DOM is ready (load once)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const poolsManager = new SalviumPoolsManager();
            poolsManager.init();
        });
    } else {
        const poolsManager = new SalviumPoolsManager();
        poolsManager.init();
    }

})();
