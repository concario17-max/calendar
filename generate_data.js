const fs = require('fs');
const path = require('path');

const readText = (filename) => {
  return fs.readFileSync(path.join(__dirname, filename), 'utf8').replace(/`/g, '\\`');
};

const gua = readText('1.gua.txt');
const yao = readText('2.yao.txt');
const soul = readText('3.soul.txt');

const tsContent = `export const GUA_TEXT = \`${gua}\`;\n\nexport const YAO_TEXT = \`${yao}\`;\n\nexport const SOUL_TEXT = \`${soul}\`;\n`;

fs.writeFileSync(path.join(__dirname, 'src', 'data.ts'), tsContent, 'utf8');
console.log('src/data.ts created successfully!');
