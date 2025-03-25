const fs = require('fs');
const path = require('path');

// Parse the redirects from the htaccess file
const redirects = [
  { from: '/about-salvium/', to: 'about.html' },
  { from: '/downloads/', to: 'download.html' },
  { from: '/exchanges/', to: 'exchanges.html' },
  { from: '/pools/', to: 'pools.html' },
  { from: '/salvium-knowledge-base/', to: 'docs/' },
  { from: '/papers/', to: 'papers.html' },
  { from: '/road-map/', to: 'roadmap.html' },
  { from: '/blog/', to: 'blog/', forcedUrl: true },
  { from: '/engage/', to: 'community.html' },
  { from: '/brand-toolkit/', to: 'tools.html' },
  { from: '/salvium-knowledge-base/salvium-supply-audit/', to: 'docs/supply-audit.html' },
  { from: '/salvium-knowledge-base/the-salvium-protocol-and-smart-contracts/', to: 'docs/smart-contracts.html' },
  { from: '/salvium-knowledge-base/mining-and-emissions/', to: 'docs/mining-emissions.html' },
  { from: '/salvium-knowledge-base/staking-and-yield/', to: 'docs/staking-yield.html' },
  { from: '/salvium-knowledge-base/calculating-current-yield/', to: 'docs/calculating-yield.html' },
  { from: '/salvium-knowledge-base/asynchronous-transactions-at/', to: 'docs/async-transactions.html' },
  { from: '/salvium-knowledge-base/protocol_tx/', to: 'docs/protocol-tx.html' },
  { from: '/salvium-knowledge-base/about-privacy/', to: 'docs/privacy.html' },
  { from: '/salvium-knowledge-base/explorer/', to: 'docs/explorer.html' },
  { from: '/salvium-knowledge-base/supply-and-market-cap/', to: 'docs/supply-market-cap.html' },
  { from: '/salvium-knowledge-base/daemon-rpc/', to: 'docs/daemon-rpc.html' },
  { from: '/salvium-knowledge-base/wallet-rpc/', to: 'docs/wallet-rpc.html' },
  { from: '/salvium-knowledge-base/audit-manual-validation-process/', to: 'docs/audit-validation.html' },
  { from: '/salvium-knowledge-base/what-is-salvium/', to: 'docs/what-is-salvium.html' },
  { from: '/salvium-knowledge-base/salvium-litepaper/', to: 'docs/litepaper.html' },
  { from: '/salvium-knowledge-base/how-to-get-involved/', to: 'docs/get-involved.html' },
  { from: '/salvium-knowledge-base/audits/', to: 'docs/audits.html' },
  { from: '/salvium-knowledge-base/get-started-with-salvium/', to: 'docs/get-started.html' },
  { from: '/salvium-knowledge-base/compliance-statement/', to: 'docs/compliance.html' },
  { from: '/salvium-knowledge-base/project-roadmap/', to: 'docs/roadmap.html' },
  { from: '/salvium-knowledge-base/funding-and-token-allocation/', to: 'docs/funding-allocation.html' },
  { from: '/salvium-knowledge-base/project-team-and-history/', to: 'docs/team-history.html' },
  { from: '/salvium-knowledge-base/salvium-treasury-report-q3-2024/', to: 'docs/treasury-report-q3-2024.html' },
  { from: '/salvium-knowledge-base/desktop-wallet-user-guide/', to: 'docs/desktop-wallet-guide.html' },
  { from: '/salvium-knowledge-base/salvium-wallet-cli-user-guide/', to: 'docs/cli-wallet-guide.html' },
  { from: '/salvium-knowledge-base/exchange-mode-in-salvium-cli-wallet/', to: 'docs/exchange-mode-cli.html' }
];

// Template for the HTML redirect files
const generateRedirectHtml = (targetUrl) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; URL=${targetUrl}">
    <link rel="canonical" href="${targetUrl}">
  </head>
  <body>
    <p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p>
    <script>
      window.location.href = "${targetUrl}";
    </script>
  </body>
</html>`;

// Base directory for redirects
const redirectsDir = path.join(__dirname, 'redirects');

// Create directories if they don't exist
const createDirIfNotExists = (dirPath) => {
  // Ensure we're working with a normalized absolute path
  const absolutePath = path.isAbsolute(dirPath) ? dirPath : path.join(redirectsDir, dirPath);
  
  // Split the path into segments and create each directory level
  const segments = absolutePath.split(path.sep);
  let currentPath = '';
  
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    // Skip empty segments
    if (!segment && i > 0) continue; 
    
    currentPath = i === 0 
      ? segment + path.sep // Handle absolute path starting with drive letter on Windows
      : path.join(currentPath, segment);
    
    if (!fs.existsSync(currentPath) && currentPath !== '') {
      try {
        fs.mkdirSync(currentPath);
        console.log(`Created directory: ${currentPath}`);
      } catch (error) {
        console.error(`Error creating directory ${currentPath}:`, error);
        throw error;
      }
    }
  }
  
  return absolutePath;
};

// Make sure the base redirects directory exists
if (!fs.existsSync(redirectsDir)) {
  fs.mkdirSync(redirectsDir);
  console.log(`Created redirects base directory: ${redirectsDir}`);
}

// Generate HTML redirect files
redirects.forEach(redirect => {
  try {
    // Remove leading slash and convert to proper path
    const fromPath = redirect.from.startsWith('/') ? redirect.from.substring(1) : redirect.from;
    
    // Ensure path uses correct separator for the OS
    const normalizedPath = fromPath.split('/').join(path.sep);
    
    // Create the full directory path
    const fullDirPath = path.join(redirectsDir, path.dirname(normalizedPath));
    createDirIfNotExists(fullDirPath);
    
    // Calculate relative path to the target
    // Count the number of directories in the path to determine how many "../" to add
    const depth = normalizedPath.split(path.sep).filter(p => p !== '').length;
    const prefix = depth > 0 && !redirect.forcedUrl ? '../'.repeat(depth) : '/';
    
    // Create the target URL with correct relative path
    const targetUrl = redirect.forcedUrl ? '/' + redirect.to : prefix + redirect.to;
    
    // Create index.html in the directory
    const filePath = path.join(redirectsDir, normalizedPath, 'index.html');
    
    // Ensure parent directory exists
    const fileDir = path.dirname(filePath);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, generateRedirectHtml(targetUrl));
    console.log(`Created redirect: ${normalizedPath} -> ${targetUrl}`);
  } catch (error) {
    console.error(`Error creating redirect for ${redirect.from}:`, error);
  }
});

console.log('All redirects created successfully!'); 