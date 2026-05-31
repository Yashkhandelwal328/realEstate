const fs = require('fs');
const path = require('path');

function addUseClient(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      addUseClient(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('"use client"') && !content.includes("'use client'")) {
        fs.writeFileSync(fullPath, '"use client";\n' + content);
      }
    }
  }
}

addUseClient('/home/kawaii/realEstate/src/components');
addUseClient('/home/kawaii/realEstate/src/hooks');
