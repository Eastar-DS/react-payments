export type CardNumbers = [string, string, string, string] | [string, string, string];
export type SegmentCount = 3 | 4;
export type CardBrand = 'VISA' | 'MASTER' | 'AMEX' | 'DINERS' | 'UNIONPAY';
export type CardBrandOrNone = CardBrand | 'NONE';
export interface CardBrandRule {
  brand: CardBrand;
  totalLength: number;
  segmentLengths: number[];
  cvcLength: 3 | 4;
  label: string;
}

export type KoreanCardCompany =
  | 'BC'
  | 'SHINHAN'
  | 'KAKAO_BANK'
  | 'HYUNDAI'
  | 'WOORI'
  | 'LOTTE'
  | 'HANA'
  | 'KB';

export type ExpirationDate = { month: string; year: string };
export type ExpirationDateSegments = [string, string];

export interface InputFieldConfig {
  sectionTitle: string;
  hintText?: string;
  label: string;
  placeholder: readonly string[];
}

export type ValidatorResult = {
  error: boolean;
  errorMessage: string;
};

export type ValidationResult = ValidatorResult & {
  block: boolean;
};
