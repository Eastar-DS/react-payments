import { CARD_BRAND_RULES, VALIDATION_RULE } from '../constants';
import { CardBrandOrNone, CardNumbers, ExpirationDate, KoreanCardCompany } from '../types';
import { detectCardBrand, getCvcLength, joinUntilEmpty } from './cardBrand';
import { isExpirationDateInFuture } from './validate';

export const isCardNumbersComplete = (cardNumbers: CardNumbers): boolean => {
  const value = joinUntilEmpty(cardNumbers).replace(/\D/g, '');
  const brand = detectCardBrand(value);
  if (brand === 'NONE') return false;
  return value.length === CARD_BRAND_RULES[brand].totalLength;
}

export const isCardCompanyComplete = (cardCompany: KoreanCardCompany | null): boolean => cardCompany !== null;

export const isExpirationDateComplete = (date: ExpirationDate): boolean => {
  if (date.month.length !== VALIDATION_RULE.EXPIRATION_DATE_LENGTH) return false;
  if (date.year.length !== VALIDATION_RULE.EXPIRATION_DATE_LENGTH) return false;
  const m = Number(date.month);
  if (m < 1 || m > VALIDATION_RULE.MAX_MONTH) return false;
  return isExpirationDateInFuture(date);
};

export const isCvcComplete = (cvc: string, cardBrand: CardBrandOrNone): boolean => {
  return cvc.length === getCvcLength(cardBrand);
};

export const isPasswordComplete = (password: string): boolean => {
  return password.length === VALIDATION_RULE.PASSWORD_LENGTH;
};