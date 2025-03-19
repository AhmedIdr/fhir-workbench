const fs = require('fs');
const path = require('path');

// Create the out directory if it doesn't exist
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Create the .nojekyll file
const filePath = path.join(outDir, '.nojekyll');
fs.writeFileSync(filePath, '');

console.log('Created .nojekyll file in /out directory'); 