import { readFileSync } from 'node:fs';

const pairs = [
  ['1.gua.txt', 'src/data/guaData.ts', 'GUA_TEXT'],
  ['2.yao.txt', 'src/data/yaoData.ts', 'YAO_TEXT'],
  ['3.soul.txt', 'src/data/soulData.ts', 'SOUL_TEXT'],
];

function extractTemplateLiteral(moduleText, exportName) {
  const marker = `export const ${exportName} = \``;
  const start = moduleText.indexOf(marker);

  if (start === -1) {
    throw new Error(`Could not find export ${exportName}`);
  }

  const contentStart = start + marker.length;
  const end = moduleText.indexOf('`;', contentStart);

  if (end === -1) {
    throw new Error(`Could not find closing template literal for ${exportName}`);
  }

  return moduleText.slice(contentStart, end);
}

let hasMismatch = false;

for (const [sourcePath, generatedPath, exportName] of pairs) {
  const source = readFileSync(sourcePath, 'utf8');
  const generatedModule = readFileSync(generatedPath, 'utf8');
  const generated = extractTemplateLiteral(generatedModule, exportName);

  if (source !== generated) {
    hasMismatch = true;
    console.error(`Mismatch detected: ${sourcePath} -> ${generatedPath}`);
  }
}

if (hasMismatch) {
  process.exit(1);
}

console.log('Generated data files are in sync with source text files.');
