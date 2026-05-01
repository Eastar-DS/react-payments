export const cardNumbersValidator = (inputValue: string, index: number) => {
  const isFirstCardNumbers = index === 0;
  if (isFirstCardNumbers && validateCardBrandNumber(inputValue)) {
    return {
      error: true,
      errorMessage: '유효한 카드 브랜드 번호를 입력해주세요.',
    };
  }

  if (validateInputValueLength(inputValue, 4)) {
    return {
      error: true,
      errorMessage: '숫자는 4자리를 입력해야 합니다.',
    };
  }

  return {
    error: false,
    errorMessage: '',
  };
};

export const expirationDateValidator = (inputValue: string, index: number) => {
  if (validateInputValueLength(inputValue, 2)) {
    return {
      error: true,
      errorMessage: '숫자는 2자리를 입력해야 합니다.',
    };
  }

  // 월
  if (index === 0 && validateMonth(inputValue, 12)) {
    return {
      error: true,
      errorMessage: '월은 1~12 사이의 숫자만 입력 가능합니다.',
    };
  }

  // 년도
  if (index === 1 && validateYear(inputValue)) {
    return {
      error: true,
      errorMessage: '년도는 현재 년도 이상만 입력 가능합니다.',
    };
  }

  return {
    error: false,
    errorMessage: '',
  };
};

export const cvcValidator = (inputValue: string) => {
  if (validateInputValueLength(inputValue, 3)) {
    return {
      error: true,
      errorMessage: '숫자는 3자리를 입력해야 합니다.',
    };
  }

  return {
    error: false,
    errorMessage: '',
  };
};

// 숫자 외의 값이 입력되는 경우 검증
export const validateNaN = (inputValue: string) => isNaN(Number(inputValue));

// 입력된 번호의 개수가 maxLength보다 작은 경우 검증
const validateInputValueLength = (inputValue: string, inputMaxLength: number) =>
  inputValue.length < inputMaxLength;

// cardBrand 번호가 맞는지 검증
export const validateCardBrandNumber = (inputValue: string) => {
  if (inputValue.startsWith('4')) return false;

  const slicedValue = Number(inputValue.slice(0, 2));
  if (slicedValue >= 51 && slicedValue <= 55) return false;

  return true;
};

// 월 범위를 벗어난 경우
const validateMonth = (inputValue: string, inputMaxDate: number) =>
  Number(inputValue) === 0 || Number(inputValue) > inputMaxDate;

// 년도 범위를 벗어난 경우 (26이상 99이하)
export const validateYear = (inputValue: string) => {
  const currentYear = new Date(Date.now()).getFullYear() % 100;
  return Number(inputValue) < currentYear;
};
