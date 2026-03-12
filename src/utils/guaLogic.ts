import type { GuaData } from '../types';
import { normalizeNewlines } from './textUtils';

export function splitGua(block: string): GuaData {
  const b = normalizeNewlines(block);
  const lines = b.split('\n');
  let meta = lines.slice(1).join('\n').trim();
  meta = meta.replace(/(^|\n)[ \t]+(?=\()/g, '$1');
  return { header: (lines[0] || '').trim(), meta };
}
