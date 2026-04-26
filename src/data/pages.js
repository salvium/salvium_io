// ---------------------------------------------------------------------------
// Static content for the locally hosted pages.
// Edit these arrays/objects to update page content.
// ---------------------------------------------------------------------------

export const ABOUT_CONTENT = {
  eyebrow: '/ About',
  title: 'About Salvium',
  intro:
    'Salvium is a cutting-edge proof-of-work private blockchain that seamlessly integrates staking, enhanced privacy, and DeFi capabilities while aligning with evolving crypto regulations. It incorporates advanced privacy technologies such as stealth addresses and ring signatures to ensure secure, confidential transactions.',
  sections: [
    {
      title: 'Overview',
      body:
        "Taking a 'privacy-first' approach, Salvium is designed to meet full MiCA compliance. At launch, we introduced phase-one compliance features such as refundable payments and a specialized 'exchange mode' for supporting these refunds.",
    },
    {
      title: 'Mining Specifications',
      body:
        'Salvium utilizes the RandomX algorithm with a 120-second block time and a block reward of 83.8265 SAL. Our dynamic difficulty adjustment ensures network stability and fair mining opportunities for all participants.',
    },
    {
      title: 'Staking Mechanism',
      body:
        "Salvium's staking system requires users to lock their SAL tokens for approximately 30 days (21,600 blocks) to earn rewards. During the initial phase, 15% of block rewards are distributed proportionally among all active stakers. This approach supports a stable network and rewards long-term holders, forming the foundation of a sustainable token economy. In the future, Salvium aims to introduce private DeFi features that generate yields.",
    },
    {
      title: 'Security & Compliance',
      body:
        'Security is paramount at Salvium. We champion ethical usage while ensuring regulatory compliance, laying the groundwork for truly private decentralized finance. Our selective transparency features allow users to control their privacy level — crucial for exchange compliance. The platform is proactively designed with upcoming regulations in mind, ensuring long-term sustainability and adoption.',
    },
  ],
  distribution: {
    title: 'Token Distribution',
    intro:
      "Salvium's tokenomics are designed to reward active participation, fund innovation, and ensure long-term sustainability:",
    items: [
      {
        label: 'Block Rewards',
        percent: '87.99%',
        body:
          'Earned by miners and stakers. Initially 80% goes to miners and 20% to stakers. Once DeFi features are live, miners receive 100% of rewards, and stakers begin earning from system fees.',
      },
      {
        label: 'Operations Fund — Locked',
        percent: '8.48%',
        body:
          'Used to support development, integrations, and bounties. Time-locked in a governance wallet, released on a scheduled basis.',
      },
      {
        label: 'Build Fund',
        percent: '3.53%',
        body:
          "Allocated to early contributors, developers, and suppliers who supported Salvium's launch.",
      },
    ],
    footnote:
      'Note: Percentages refer to the capped 184M SAL supply and exclude tail emissions, which continue beyond the cap to support long-term miner incentives.',
  },
}

export const FAQ_CONTENT = [
  {
    category: 'General Information',
    items: [
      {
        q: 'What is Salvium?',
        a: 'Salvium is a private, proof-of-work Layer 1 blockchain that balances strong privacy with the regulatory primitives needed for real-world finance. For a comprehensive overview, see the About page.',
      },
      {
        q: 'How does Salvium differ from other privacy coins like Monero?',
        a: "While Salvium builds on Monero's privacy features, it distinguishes itself through a focus on DeFi capabilities and regulatory compliance. Salvium introduces staking, yield generation, and features designed to meet emerging crypto regulations while maintaining strong privacy protections.",
      },
      {
        q: 'Who is behind the Salvium project?',
        a: "Salvium is developed by a team of experienced, anonymous experts in Monero, decentralized finance (DeFi), and applied cryptography. While the team members remain anonymous to maintain the project's decentralized nature, they bring a wealth of experience from pioneering work in implementing advanced cryptographic techniques for transaction privacy and security. The project began as a research initiative in early 2023 and has since evolved into a full-fledged blockchain platform.",
      },
    ],
  },
  {
    category: 'Tokenomics & Mining',
    items: [
      {
        q: 'What is the total supply of Salvium (SAL) tokens?',
        a: 'The initial supply of Salvium is 184.4 million SAL, with a tail emission of 3 SAL per block after the initial supply is mined.',
      },
      {
        q: 'What is the block time for Salvium?',
        a: 'The block time for Salvium is 120 seconds (2 minutes).',
      },
      {
        q: 'How can I mine Salvium?',
        a: 'Salvium uses the RandomX mining algorithm. Detailed mining instructions are available in the official documentation.',
      },
      {
        q: 'Was there a pre-mine for Salvium, and if so, what was its purpose?',
        a: "Yes, Salvium had a 12.01% pre-mine. This pre-mine serves two main purposes: Build (3.5%) — allocated as incentives for early developers and contributors to support the project's launch; Operations (8.48%) — set aside for ongoing development, enhancements, and new feature implementation, with these tokens time-locked and released over 24 monthly installments. The pre-mine is crucial for funding the project's development and ensuring its long-term sustainability.",
      },
    ],
  },
  {
    category: 'Privacy & Security',
    items: [
      {
        q: 'How does Salvium ensure privacy in transactions?',
        a: 'Salvium uses a combination of Ring Signatures, Ring Confidential Transactions (RingCT), and Stealth Addresses to protect the privacy of senders, receivers, and transaction amounts.',
      },
      {
        q: 'How does Salvium address regulatory compliance?',
        a: "Salvium is actively working towards regulatory compliance. We're implementing features like Exchange Mode, refundable transactions, and view keys to meet emerging regulatory requirements while maintaining core privacy features.",
      },
      {
        q: 'What is the purpose of the "Exchange Mode" in Salvium?',
        a: 'Exchange Mode is designed to help exchanges comply with MiCA regulations. It includes features like freezing incoming payments and the ability to return exact received funds, enabling exchanges to operate with Salvium while meeting regulatory requirements.',
      },
    ],
  },
  {
    category: 'Technology & Features',
    items: [
      {
        q: 'How does staking work in Salvium?',
        a: 'Staking in Salvium allows users to lock their SAL tokens to earn rewards. Stakers receive 15% of the block reward, distributed proportionally among all active stakers based on their staked amount.',
      },
      {
        q: 'What is the "protocol_tx" feature in Salvium?',
        a: 'protocol_tx is a block-level transaction used for minting new coins (except block rewards) and facilitating advanced features like stake payouts and yield distribution.',
      },
      {
        q: 'What are Asynchronous Transactions in Salvium?',
        a: 'Asynchronous Transactions allow for the minting of coins in separate blocks from burn transactions, enabling more complex operations like yield payouts for staking.',
      },
      {
        q: 'How does Salvium plan to implement smart contracts?',
        a: "Smart contract functionality is planned for Phase 3 of Salvium's development. We aim to leverage our protocol_tx innovation and provide Ethereum dApp porting middleware to enable complex DeFi applications.",
      },
    ],
  },
  {
    category: 'Usage & Participation',
    items: [
      {
        q: 'Is Salvium compatible with hardware wallets?',
        a: "Currently, Salvium is not compatible with hardware wallets. However, there's no technical reason preventing compatibility in the future, and we're exploring this option as part of our ongoing development.",
      },
      {
        q: 'How can I get involved with the Salvium project?',
        a: 'Join our community on Discord and participate in discussions, contribute to the open-source codebase on GitHub, help test new features and provide feedback, create educational content about Salvium, and spread the word in your networks.',
      },
    ],
  },
]

export const PAPERS_CONTENT = {
  whitePapers: [
    {
      title: 'Salvium One White Paper',
      lang: 'English',
      desc:
        'A deep dive into the Salvium Protocol architecture, privacy features, and economic model.',
      href: 'https://raw.githubusercontent.com/salvium/salvium_library/main/papers/Salvium_One_White_Paper_v1.pdf',
    },
  ],
  litePapers: [
    {
      title: 'Lite Paper',
      lang: 'English',
      desc: 'The comprehensive guide to Salvium Protocol, its features, and technical specifications.',
      href: '/docs/salvium-litepaper-v1_0-english.pdf',
    },
    {
      title: 'Lite Paper',
      lang: '中文 (Chinese)',
      desc: 'Salvium Protocol 的完整指南，包括其功能和技术规格。',
      href: '/docs/salvium-litepaper-v1_0-chinese.pdf',
    },
    {
      title: 'Lite Paper',
      lang: '日本語 (Japanese)',
      desc: 'Salvium Protocol の包括的なガイド、その機能と技術仕様。',
      href: '/docs/salvium-litepaper-v1_0-japanese.pdf',
    },
    {
      title: 'Lite Paper',
      lang: '한국어 (Korean)',
      desc: 'Salvium Protocol의 기능과 기술 사양에 대한 포괄적인 가이드.',
      href: '/docs/salvium-litepaper-v1_0-korean.pdf',
    },
    {
      title: 'Lite Paper',
      lang: 'Español (Spanish)',
      desc: 'Guía completa del Protocolo Salvium, sus características y especificaciones técnicas.',
      href: '/docs/salvium-litepaper-v1_0-spanish.pdf',
    },
    {
      title: 'Lite Paper',
      lang: 'Français (French)',
      desc: 'Guide complet du Protocole Salvium, ses fonctionnalités et spécifications techniques.',
      href: '/docs/salvium-litepaper-v1_0-french.pdf',
    },
    {
      title: 'Lite Paper',
      lang: 'Bahasa Indonesia',
      desc: 'Panduan lengkap untuk Protokol Salvium, fitur dan spesifikasi teknisnya.',
      href: '/docs/salvium-litepaper-v1_0-indonesian.pdf',
    },
    {
      title: 'Lite Paper',
      lang: 'Deutsch (German)',
      desc: 'Umfassender Leitfaden zum Salvium Protocol, seinen Funktionen und technischen Spezifikationen.',
      href: '/docs/salvium-litepaper-v1_0-german.pdf',
    },
  ],
}

export const TOOLS_CONTENT = {
  trackers: [
    {
      name: 'CoinGecko',
      desc: 'Track Salvium price, market cap, and trading volume on CoinGecko.',
      cta: 'Open',
      href: 'https://www.coingecko.com/en/coins/salvium',
    },
    {
      name: 'Coinpaprika',
      desc: 'View detailed market analysis and statistics on Coinpaprika.',
      cta: 'Market Analysis',
      href: 'https://coinpaprika.com/coin/sal-salvium/',
    },
    {
      name: 'Coinranking',
      desc: "Check Salvium's ranking and market performance.",
      cta: 'Rankings',
      href: 'https://coinranking.com/coin/Vl1CI175t+salvium-sal',
    },
    {
      name: 'Forbes Digital Assets',
      desc: 'Professional market analysis and insights from Forbes.',
      cta: 'Market Insights',
      href: 'https://www.forbes.com/digital-assets/assets/salvium-sal/',
    },
    {
      name: 'LiveCoinWatch',
      desc: 'Real-time price tracking and market data.',
      cta: 'Live Tracking',
      href: 'https://www.livecoinwatch.com/price/Salvium-__SAL',
    },
    {
      name: 'CoinCheckup',
      desc: 'Comprehensive coin analysis and market research.',
      cta: 'Market Research',
      href: 'https://coincheckup.com/coins/salvium',
    },
  ],
  mining: [
    {
      name: 'Mining Pool Stats',
      desc: 'View mining pool statistics and performance metrics.',
      cta: 'Pool Stats',
      href: 'https://miningpoolstats.stream/salvium',
    },
    {
      name: 'WhatToMine',
      desc: 'Calculate potential mining rewards and profitability.',
      cta: 'Profitability',
      href: 'https://whattomine.com/coins/427-sal-randomx',
    },
    {
      name: 'PoolBay',
      desc: 'Monitor network hashrate and difficulty levels.',
      cta: 'Network Stats',
      href: 'https://poolbay.io/crypto/5874/salvium',
    },
  ],
}

export const EXCHANGES_CONTENT = [
  {
    name: 'MEXC',
    pair: 'SAL/USDT',
    desc: 'Top-tier global exchange with deep SAL liquidity.',
    href: 'https://www.mexc.com/exchange/SAL_USDT',
  },
  {
    name: 'NonKYC',
    pair: 'SAL/USDT',
    desc: 'KYC-free trading for users who value privacy.',
    href: 'https://nonkyc.io/market/SAL_USDT',
  },
  {
    name: 'CoinEx',
    pair: 'SAL/USDT',
    desc: 'Established exchange offering SAL spot trading.',
    href: 'https://www.coinex.com/exchange/sal-usdt',
  },
]

export const POOLS_CONTENT = [
  {
    name: 'Kryptex Pool',
    tags: ['PPS+', 'Auto-Exchange'],
    desc: 'Multi-coin mining pool with PPS+ rewards and auto-exchange options.',
    href: 'https://pool.kryptex.com/sal',
  },
  {
    name: 'HeroMiners',
    tags: ['PPS+ / PROPX', 'Low Fee'],
    desc: 'Multi-coin mining pool with PPS+ and PROPX payment systems, supporting both pool and solo mining.',
    href: 'https://salvium.herominers.com/',
  },
  {
    name: 'MiningOcean',
    tags: ['PPLNS', 'Low Fee'],
    desc: 'Mining pool with PPLNS payment system, supporting both pool and solo mining.',
    href: 'https://salvium.miningocean.org/',
  },
  {
    name: 'HashVault',
    tags: ['PPLNS / Solo', '0.9% Fee'],
    desc: 'Multi-coin mining pool with PPLNS and solo mining support.',
    href: 'https://hashvault.pro/salvium/',
  },
  {
    name: 'Rplant',
    tags: ['PROP', '1% Fee'],
    desc: 'Multi-coin mining pool with PROP payment system.',
    href: 'https://pool.rplant.xyz/',
  },
  {
    name: 'GNTL',
    tags: ['PPLNS / Solo', '0.3% Fee'],
    desc: 'Mining pool with PPLNS payment system and solo mining support.',
    href: 'https://sal.gntl.uk/',
  },
  {
    name: 'MoneroOcean',
    tags: ['Algo-Switching', '0% Fee'],
    desc: 'Multi-coin mining pool with algo-switching that pays out in XMR.',
    href: 'https://moneroocean.stream/',
  },
  {
    name: 'WhiskyMine',
    tags: ['PPLNS', 'Low Fee'],
    desc: 'Community-run Salvium mining pool with PPLNS payouts.',
    href: 'https://whiskymine.io/',
  },
]
