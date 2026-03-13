import type { YaoData } from '../types';
import { normalizeNewlines } from './textUtils';

export function splitYao(block: string): YaoData {
  const b = normalizeNewlines(block);
  const lines = b.split('\n');
  let titleLine = (lines[0] || '').trim();

  // "338. ... . 바파" 구조 분리
  titleLine = titleLine.replace(/^(\d+\.\s+.*?\.)\s+(.*)$/, '$1\n$2');

  const rest = lines.slice(1).join('\n').trim();
  const paras = rest.split(/\n\s*\n/g).map((s: string) => s.trim()).filter(Boolean);
  return { titleLine, short: paras[0] || '', body: paras.slice(1).join('\n\n') };
}

export function generateGuidedQuestion(yaoTitle: string): string {
  const lines = yaoTitle.split('\n');
  const nameLine = lines.length > 1 ? lines[lines.length - 1] : lines[0];
  
  // 첫 번째 괄호 '(' 또는 슬래시 '/' 이전의 텍스트만 추출 (이름만 남김)
  let cleanTitle = nameLine.split('(')[0].split('/')[0].trim();
  
  // 맨 앞의 숫자와 마침표 제거 (예: "28. ")
  cleanTitle = cleanTitle.replace(/^\d+\.\s*/, '');

  const questions = [
    `"${cleanTitle}"의 상징을 묵상하며, 오늘 당신의 상황과 어떻게 연결될까요?`,
    `"${cleanTitle}"의 지혜가 오늘 당신이 마주한 과제에 어떤 통찰을 줄 수 있을까요?`,
    `오늘 하루, "${cleanTitle}"의 가르침을 어떻게 행동으로 옮길 수 있을까요?`,
    `"${cleanTitle}"의 관점에서 보았을 때, 내면에서 변화가 필요한 부분은 무엇인가요?`
  ];
  return questions[Math.floor(Math.random() * questions.length)];
}

