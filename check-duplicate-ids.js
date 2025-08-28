const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  return fs.readdirSync(dir).filter(f => f.endsWith('.html'));
}

const files = process.argv.slice(2);
const targets = files.length ? files : getHtmlFiles(process.cwd());
let hasDupes = false;

for (const file of targets) {
  const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  const ids = new Set();
  const regex = /id="([^"]+)"/g;
  let match;
  while ((match = regex.exec(content))) {
    const id = match[1];
    if (id.includes('$')) continue; // ignore template placeholders
    if (ids.has(id)) {
      console.error(`Duplicate id "${id}" found in ${file}`);
      hasDupes = true;
    } else {
      ids.add(id);
    }
  }
}

if (hasDupes) {
  process.exit(1);
} else {
  console.log('No duplicate IDs found.');
}
