import type { YaoData } from '../types';
import { normalizeNewlines } from './textUtils';

export function splitYao(block: string): YaoData {
  const b = normalizeNewlines(block);
  const lines = b.split('\n');
  let titleLine = (lines[0] || '').trim();

  // Some entries place extra title metadata after the first period-delimited label.
  titleLine = titleLine.replace(/^(\d+\.\s+.*?\.)\s+(.*)$/, '$1\n$2');

  const rest = lines.slice(1).join('\n').trim();
  const paras = rest.split(/\n\s*\n/g).map((s: string) => s.trim()).filter(Boolean);
  return { titleLine, short: paras[0] || '', body: paras.slice(1).join('\n\n') };
}

export function generateGuidedQuestion(yaoTitle: string): string {
  const lines = yaoTitle.split('\n');
  const nameLine = lines.length > 1 ? lines[lines.length - 1] : lines[0];

  // Strip parenthetical and slash-separated metadata, then remove any leading number.
  let cleanTitle = nameLine.split('(')[0].split('/')[0].trim();
  cleanTitle = cleanTitle.replace(/^\d+\.\s*/, '');

  const questions = [
    `"${cleanTitle}"의 상징이 오늘의 삶과 어떻게 이어지는지 묵상해보세요.`,
    `"${cleanTitle}"이 지금 당신 앞의 과제에 어떤 통찰을 주는지 떠올려보세요.`,
    `"${cleanTitle}"의 가르침을 오늘 어떤 행동으로 옮길 수 있을지 적어보세요.`,
    `"${cleanTitle}"의 관점에서 볼 때, 지금 내면에서 변화가 필요한 부분은 무엇인지 생각해보세요.`,
  ];

  return questions[Math.floor(Math.random() * questions.length)];
}
