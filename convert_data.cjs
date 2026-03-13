const fs = require('fs');
const path = require('path');

function convert(txtFile, tsFile, constName) {
    const content = fs.readFileSync(txtFile, 'utf8');
    // Escape backslashes and backticks for template literal
    const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    const tsContent = `export const ${constName} = \`${escaped}\`;\n`;
    fs.writeFileSync(tsFile, tsContent, 'utf8');
    console.log(`Converted ${txtFile} to ${tsFile}`);
}

convert('1.gua.txt', 'src/data/guaData.ts', 'GUA_TEXT');
convert('2.yao.txt', 'src/data/yaoData.ts', 'YAO_TEXT');
convert('3.soul.txt', 'src/data/soulData.ts', 'SOUL_TEXT');
