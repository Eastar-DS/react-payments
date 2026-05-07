import { ERROR_MESSAGE, VALIDATION_RULE } from '../constants';

// 숫자 외의 값이 입력되는 경우 검증
export const validateNaN = (inputValue: string) => isNaN(Number(inputValue));

// 입력된 번호의 개수가 maxLength보다 작은 경우 검증
const validateInputValueLength = (inputValue: string, inputMaxLength: number) =>
  inputValue.length < inputMaxLength;

// export const cardNumbersValidator = (inputValue: string, index: number) => {
//   const isFirstCardNumbers = index === 0;
//   if (isFirstCardNumbers) {
//     return {
//       error: true,
//       errorMessage: ERROR_MESSAGE.INVALID_CARD_BRAND_NUMBER,
//     };
//   }

//   if (validateInputValueLength(inputValue, VALIDATION_RULE.CARD_NUMBERS_LENGTH)) {
//     return {
//       error: true,
//       errorMessage: ERROR_MESSAGE.MAX_LENGTH(VALIDATION_RULE.CARD_NUMBERS_LENGTH),
//     };
//   }

//   return {
//     error: false,
//     errorMessage: '',
//   };
// };

// 카드번호 칸 단위 검증은 비움.
export const cardNumbersValidator = (_inputValue: string) => {
  return { error: false, errorMessage: '' };
};

// Phase 3에서 makeExpirationDateValidator로 갱신 예정.
// step1 시그니처 유지. INVALID_YEAR 분기는 제거 (폐기 메시지).
export const expirationDateValidator = (inputValue: string, index: number) => {
  if (validateInputValueLength(inputValue, VALIDATION_RULE.EXPIRATION_DATE_LENGTH)) {
    return {
      error: true,
      errorMessage: ERROR_MESSAGE.MAX_LENGTH(VALIDATION_RULE.EXPIRATION_DATE_LENGTH),
    };
  }

  // 월
  if (index === 0 && validateMonth(inputValue, VALIDATION_RULE.MAX_MONTH)) {
    return {
      error: true,
      errorMessage: ERROR_MESSAGE.INVALID_MONTH,
    };
  }

  // 년도
  // if (index === 1 && validateYear(inputValue)) {
  //   return {
  //     error: true,
  //     errorMessage: ERROR_MESSAGE.INVALID_YEAR,
  //   };
  // }

  return {
    error: false,
    errorMessage: '',
  };
};

// Phase 3에서 makeCvcValidator(brand)로 갱신 예정. 임시 하드코딩 3.
export const cvcValidator = (inputValue: string) => {
  if (inputValue.length < 3) {
    return {
      error: true,
      errorMessage: ERROR_MESSAGE.MAX_LENGTH(3),
    };
  }
  return {
    error: false,
    errorMessage: '',
  };
};

// cardBrand 번호가 맞는지 검증
// export const validateCardBrandNumber = (inputValue: string) => {
//   if (inputValue.startsWith(CARD_BRAND_RULES.VISA.PREFIX)) return false;

//   const slicedValue = Number(inputValue.slice(0, CARD_BRAND_RULES.MASTER.PREFIX_LENGTH));
//   if (
//     slicedValue >= CARD_BRAND_RULES.MASTER.PREFIX_MIN &&
//     slicedValue <= CARD_BRAND_RULES.MASTER.PREFIX_MAX
//   )
//     return false;

//   return true;
// };

// 월 범위를 벗어난 경우
const validateMonth = (inputValue: string, inputMaxDate: number) =>
  Number(inputValue) === 0 || Number(inputValue) > inputMaxDate;

// 년도 범위를 벗어난 경우 (26이상 99이하)
// export const validateYear = (inputValue: string) => {
//   const currentYear = new Date(Date.now()).getFullYear() % 100;
//   return Number(inputValue) < currentYear;
// };
