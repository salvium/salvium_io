// Roadmap, tokenomics, stats, and privacy flow — static structured data
// rendered into home-page sections. Edit values here to update the home page.
//
// (Astro pulls posts via the content collection at src/content/blog/, not
// from a generated blog-posts.js module the way the React rewrite did.)

export const ROADMAP = [
  {
    phase: 'Phase 1',
    title: 'Launch Salvium',
    status: 'completed',
    bullets: [
      'Native staking: SAL holders earn a share of block rewards',
      '21,600-block (~30 day) lock period for stakers',
      'Refundable transactions: first MiCA-aligned compliance step on a Monero-based chain',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Enhancing Compliance Features',
    status: 'completed',
    bullets: [
      'MiCA-aligned selective transparency via shareable view keys',
      'Zero-knowledge proof systems for selective disclosure and verification',
      'CARROT addressing + Salvium-native SPARC spend proofs',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'DeFi Integration',
    status: 'in-progress',
    bullets: [
      'Smart contract functionality via protocol_tx innovations',
      'Private token issuance for stablecoins and assets',
      'Ethereum dApp porting middleware',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Ecosystem Growth',
    status: 'upcoming',
    bullets: [
      'Comprehensive developer tooling and documentation',
      'Strategic partnerships and cross-chain interoperability',
      'Privacy-preserving applications across the network',
    ],
  },
]

export const PRIVACY_FLOW = [
  { name: 'Stealth Address', desc: 'One-time recipient address per transaction' },
  { name: 'Ring Signature', desc: 'Sender hidden among a ring of plausible signers' },
  { name: 'RingCT', desc: 'Transaction amounts hidden by cryptographic commitments' },
  { name: 'CARROT', desc: 'Rerandomizable RingCT outputs + forward secrecy' },
  { name: 'SPARC', desc: 'Spend proofs & anonymized returns for compliance' },
  { name: 'View Keys', desc: 'Selective transparency to authorized parties' },
]

export const STATS = [
  { label: 'Block time', value: '120', suffix: 's' },
  { label: 'Block reward', value: '123.825', suffix: 'SAL' },
  { label: 'Staker share', value: '20', suffix: '%' },
  { label: 'Stake lock', value: '21,600', suffix: 'blocks · ~30d' },
  { label: 'Capped supply', value: '184.4M', suffix: 'SAL' },
  { label: 'Algorithm', value: 'RandomX', suffix: 'PoW' },
]

export const TOKENOMICS = [
  {
    label: 'Block Rewards',
    pct: 87.99,
    color: '#0AEB85',
    desc: 'Earned by miners and stakers. Initially 80% miners / 20% stakers. Once DeFi features ship, miners receive 100% of rewards and stakers begin earning from system fees.',
  },
  {
    label: 'Operations Fund (locked)',
    pct: 8.48,
    color: '#40E0D0',
    desc: 'Used to support development, integrations, and bounties. Time-locked in a governance wallet, released on a scheduled basis.',
  },
  {
    label: 'Build Fund',
    pct: 3.53,
    color: '#80cbc4',
    desc: 'Allocated to early contributors, developers, and suppliers who supported Salvium\'s launch.',
  },
]
