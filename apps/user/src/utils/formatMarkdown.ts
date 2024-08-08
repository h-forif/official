/**
 * 마크다운 문자열을 포맷팅하여 "<br>" 또는 "<br/>"을 두 줄 개행으로 대체합니다.
 *
 * @param input - 포맷팅할 마크다운 문자열입니다.
 * @returns 포맷팅된 마크다운 문자열입니다.
 */
function formatMarkdown(input: string | undefined): string {
  if (!input) return '';
  return input.replace(/<br\s*\/?>/gi, '\n\n');
}

export default formatMarkdown;
