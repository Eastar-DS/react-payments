import { InputFieldConfig } from '../types';

export const INPUT_FIELD_CONFIG: Record<string, InputFieldConfig> = {
  CARD_NUMBERS: {
    sectionTitle: '결제할 카드 번호를 입력해 주세요',
    hintText: '본인 명의의 카드만 결제 가능합니다.',
    label: '카드 번호',
    placeholder: ['1234', '1234', '1234', '1234'],
  },
  EXPIRATION_DATE: {
    sectionTitle: '카드 유효기간을 입력해 주세요',
    hintText: '월/년도(MMYY)를 순서대로 입력해 주세요.',
    label: '유효 기간',
    placeholder: ['MM', 'YY'],
  },
  CVC: {
    sectionTitle: 'CVC 번호를 입력해 주세요',
    label: 'CVC',
    placeholder: ['123'],
  },
} as const;

export const CARD_BRAND = { VISA: 'VISA', MASTER_CARD: 'MASTER' } as const;

export const BRAND_ICON_MAP = {
  VISA: 'src/assets/visa.svg',
  MASTER: '/src/assets/mastercard.svg',
  NONE: '',
};
