export function parseGoogleUserName({ name }: TokenInfo): {
  name: string;
  department: string;
} {
  // 정규 표현식 패턴: 이름 | 학과 | 대학
  const pattern = /^(.+)\s\|\s(.+)\s\|\s(.+)$/;

  // 입력 문자열이 패턴과 일치하는지 확인
  const match = name.match(pattern);

  if (match) {
    // 이름과 학과 추출
    const parsedName = match[1]!.trim();
    const department = match[2]!.trim();

    return { name: parsedName, department };
  }
  return { name: '', department: '' };
}
