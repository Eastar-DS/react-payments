import { ERROR_MESSAGE, VALIDATION_RULE } from '../constants';
import { CardBrandOrNone, CardNumbers, ExpirationDate, ValidatorResult } from '../types';
import { detectCardBrand, getCvcLength, joinUntilEmpty } from './cardBrand';

// 숫자 외의 값이 입력되는 경우 검증
export const validateNaN = (inputValue: string) => isNaN(Number(inputValue));

export const makeCardNumbersValidator = (
  cardNumbers: CardNumbers,
  segmentsLengths: readonly number[]
) => {
  return (value: string, index: number): ValidatorResult => {
    if (value.length > 0 && value.length < segmentsLengths[index]) {
      return {
        error: true,
        errorMessage: ERROR_MESSAGE.MAX_LENGTH(segmentsLengths[index]),
      };
    }

    const next = cardNumbers.map((segment, segmentIndex) =>
      segmentIndex === index ? value : segment
    ) as CardNumbers;

    const joined = joinUntilEmpty(next);

    if (joined.length > 0 && detectCardBrand(joined) === 'NONE') {
      return {
        error: true,
        errorMessage: ERROR_MESSAGE.INVALID_CARD_BRAND_NUMBER,
      };
    }

    return { error: false, errorMessage: '' };
  };
};

// 유효기간
export const isExpirationDateInFuture = ({ month, year }: ExpirationDate): boolean => {
  if (month.length !== VALIDATION_RULE.EXPIRATION_DATE_LENGTH) return false;
  if (year.length !== VALIDATION_RULE.EXPIRATION_DATE_LENGTH) return false;
  const currentYY = new Date().getFullYear() % 100;
  const currentMM = new Date().getMonth() + 1;
  const inputYY = Number(year);
  const inputMM = Number(month);
  if (Number.isNaN(inputYY) || Number.isNaN(inputMM)) return false;
  if (inputYY > currentYY) return true;
  if (inputYY === currentYY && inputMM >= currentMM) return true;
  return false;
};

const validateExpirationField = (value: string, index: number): ValidatorResult => {
  if (validateNaN(value)) {
    return { error: true, errorMessage: ERROR_MESSAGE.NAN };
  }
  if (value.length > VALIDATION_RULE.EXPIRATION_DATE_LENGTH) {
    return {
      error: true,
      errorMessage: ERROR_MESSAGE.MAX_LENGTH(VALIDATION_RULE.EXPIRATION_DATE_LENGTH),
    };
  }
  if (index === 0 && value.length === VALIDATION_RULE.EXPIRATION_DATE_LENGTH) {
    const m = Number(value);
    if (m < 1 || m > VALIDATION_RULE.MAX_MONTH) {
      return { error: true, errorMessage: ERROR_MESSAGE.INVALID_MONTH };
    }
  }
  return { error: false, errorMessage: '' };
};

export const makeExpirationDateValidator =
  (currentDate: ExpirationDate) =>
  (value: string, index: number): ValidatorResult => {
    const fieldResult = validateExpirationField(value, index);
    if (fieldResult.error) return fieldResult;

    const next: ExpirationDate =
      index === 0 ? { ...currentDate, month: value } : { ...currentDate, year: value };
    const bothFilled =
      next.month.length === VALIDATION_RULE.EXPIRATION_DATE_LENGTH &&
      next.year.length === VALIDATION_RULE.EXPIRATION_DATE_LENGTH;
    if (bothFilled && !isExpirationDateInFuture(next)) {
      return { error: true, errorMessage: ERROR_MESSAGE.INVALID_EXPIRATION_DATE };
    }

    return { error: false, errorMessage: '' };
  };

// cvc
export const makeCvcValidator =
  (cardBrand: CardBrandOrNone) =>
  (value: string): ValidatorResult => {
    if (validateNaN(value)) {
      return { error: true, errorMessage: ERROR_MESSAGE.NAN };
    }
    const cvcLength = getCvcLength(cardBrand);
    if (value.length > cvcLength) {
      return { error: true, errorMessage: ERROR_MESSAGE.MAX_LENGTH(cvcLength) };
    }
    return { error: false, errorMessage: '' };
  };

// 비밀번호
export const passwordValidator = (inputValue: string): ValidatorResult => {
  if (validateNaN(inputValue)) {
    return { error: true, errorMessage: ERROR_MESSAGE.NAN };
  }
  // 길이는 input maxLength로 차단 — 안전망
  if (inputValue.length > VALIDATION_RULE.PASSWORD_LENGTH) {
    return {
      error: true,
      errorMessage: ERROR_MESSAGE.MAX_LENGTH(VALIDATION_RULE.PASSWORD_LENGTH),
    };
  }
  return { error: false, errorMessage: '' };
};
