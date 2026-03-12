/**
 * 줄바꿈 문자 정규화 함수
 */
export function normalizeNewlines(text: string): string {
  return String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/**
 * 문장 중간 지점의 공백을 찾아 줄바꿈 태그(<br>)로 치환하여 시각적 균형을 맞춤
 */
export function applySentenceBalance(text: string): string {
  const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safe = escapeHtml(String(text || ''));

  return safe.replace(/\(([^)]+)\)/g, (match: string, inner: string) => {
    // 길이가 25자 미만이면 줄바꿈하지 않음
    if (inner.length < 25) return match;

    const mid = Math.floor(inner.length / 2);
    let best = -1, min = Infinity;

    // 중간에 가장 가까운 띄어쓰기를 찾음
    for (let i = 0; i < inner.length; i++) {
      if (inner[i] === ' ') {
        const diff = Math.abs(i - mid);
        if (diff < min) { min = diff; best = i; }
      }
    }

    if (best !== -1) {
      return '(' + inner.substring(0, best) + '<br>' + inner.substring(best + 1) + ')';
    }
    return match;
  });
}
