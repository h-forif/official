import { randomInt } from 'es-toolkit';

export function getUniqueRandomInts(
  min: number,
  max: number,
  count: number,
  validIds: number[],
): number[] {
  const randomInts = new Set<number>();

  while (randomInts.size < count) {
    const randomId = randomInt(min, max);
    if (validIds.includes(randomId)) {
      randomInts.add(randomId);
    }
  }

  return Array.from(randomInts);
}
