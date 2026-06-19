const { spawnSync } = require('node:child_process');
const path = require('node:path');

const reportPort = process.env.PLAYWRIGHT_HTML_PORT || '9324';
const args = process.argv.slice(2);
const isShowReport = args[0] === 'show-report';
const hasPort = args.some((arg) => arg === '--port' || arg.startsWith('--port='));

if (isShowReport && !hasPort) {
  args.push('--port', reportPort);
}

const cli = path.join(__dirname, '..', 'node_modules', 'playwright', 'cli.js');
const result = spawnSync(process.execPath, [cli, ...args], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PLAYWRIGHT_HTML_PORT: reportPort,
  },
});

process.exit(result.status ?? 1);
