import { CARD_BRAND_RULES, DEFAULT_CVC_LENGTH, DEFAULT_SEGMENT_LENGTHS } from '../constants';
import { CardBrand, CardBrandOrNone, CardBrandRule, CardNumbers, SegmentCount } from '../types';

const isInRange = (n: number, min: number, max: number) => n >= min && n <= max;

type PrefixMatcher = (value: string) => boolean;

const PREFIX_MATCHERS: Record<CardBrand, PrefixMatcher> = {
  VISA: (v) => v.startsWith('4'),
  MASTER: (v) => v.length >= 2 && isInRange(Number(v.slice(0, 2)), 51, 55),
  AMEX: (v) => v.startsWith('34') || v.startsWith('37'),
  DINERS: (v) => v.startsWith('36'),
  UNIONPAY: (v) => {
    if (v.length >= 6 && isInRange(Number(v.slice(0, 6)), 622126, 622925)) return true;
    if (v.length >= 4 && isInRange(Number(v.slice(0, 4)), 6282, 6288)) return true;
    if (v.length >= 3 && isInRange(Number(v.slice(0, 3)), 624, 626)) return true;
    return false;
  },
};

export function detectCardBrand(rawValue: string): CardBrandOrNone {
  const value = rawValue.replace(/\D/g, '');
  if (value.length === 0) return 'NONE';

  for (const brand of Object.keys(PREFIX_MATCHERS) as CardBrand[]) {
    if (PREFIX_MATCHERS[brand](value)) return brand;
  }
  return 'NONE';
}

export function joinUntilEmpty(cardNumbers: CardNumbers): string {
  const result: string[] = [];
  for (const seg of cardNumbers) {
    if (seg === '') break;
    result.push(seg);
  }
  return result.join('');
}

// brand: CardBrand;
//   totalLength: number;
//   segmentLengths: number[];
//   cvcLength: 3 | 4;
//   label: string;
export function getCardBrandRule(brand: CardBrand): CardBrandRule {
  return CARD_BRAND_RULES[brand];
}

export function getSegmentLengths(brand: CardBrandOrNone): readonly number[] {
  if (brand === 'NONE') return DEFAULT_SEGMENT_LENGTHS;
  return CARD_BRAND_RULES[brand].segmentLengths;
}

export function getSegmentCount(brand: CardBrandOrNone): SegmentCount {
  return getSegmentLengths(brand).length as SegmentCount;
}

export function getCvcLength(brand: CardBrandOrNone): 3 | 4 {
  if (brand === 'NONE') return DEFAULT_CVC_LENGTH;
  return CARD_BRAND_RULES[brand].cvcLength;
}

export function replaceSegmentAt(segments: CardNumbers, index: number, value: string): CardNumbers {
  return segments.map((s, i) => (i === index ? value : s)) as CardNumbers;
}

// 카드번호 인풋 개수가 바뀌어야할 때 상태를 저장한채로 인풋 개수만 바꾸기 위한 함수
export function reshapeCardNumbers(
  source: readonly string[],
  targetLengths: readonly number[],
): CardNumbers {
  const targetLen = targetLengths.length as SegmentCount;
  const a0 = source[0] ?? '';
  const a1 = source[1] ?? '';
  const a2 = source[2] ?? '';
  const a3 = source[3] ?? '';

  if (source.length === targetLen) {
    return targetLen === 4 ? [a0, a1, a2, a3] : [a0, a1, a2];
  }

  if (source.length === 4 && targetLen === 3) {
    const middle = (a1 + a2).slice(0, targetLengths[1]);
    const last = a3.slice(0, targetLengths[2]);
    return [a0, middle, last];
  }

  if (source.length === 3 && targetLen === 4) {
    const middle = a1;
    const middleFirst = middle.slice(0, targetLengths[1]);
    const middleSecond = middle.slice(targetLengths[1]);
    const last = a2.slice(0, targetLengths[3]);
    return [a0, middleFirst, middleSecond, last];
  }

  throw new Error(`Unsupported conversion: ${source.length} -> ${targetLen}`);
}