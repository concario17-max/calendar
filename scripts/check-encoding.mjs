import { readFileSync } from 'node:fs';

const files = [
  'README.md',
  'plan.md',
  'research.md',
  'src/components/Header.tsx',
  'src/components/DatePicker.tsx',
  'src/components/IChingSection.tsx',
  'src/components/SoulCalendarSection.tsx',
  'src/components/JournalModal.tsx',
  'src/hooks/useTheme.ts',
];

const suspiciousPatterns = ['�', '??'];

let failed = false;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const hasIssue = suspiciousPatterns.some((pattern) => text.includes(pattern));

  if (hasIssue) {
    failed = true;
    console.error(`Potential encoding issue detected in ${file}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log('No suspicious replacement characters found in tracked UI/docs files.');
