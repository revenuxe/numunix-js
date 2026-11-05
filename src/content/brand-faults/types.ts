export type SymptomCard = { title: string; label: string; body: string };
export type SymptomCopy = readonly [
  readonly [string, string],
  readonly [string, string],
  readonly [string, string],
  readonly [string, string],
  readonly [string, string],
  readonly [string, string],
];
export type BrandSymptomCopy = Record<string, SymptomCopy>;
