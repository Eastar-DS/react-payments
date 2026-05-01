export const cardNumbersValidator = (inputValue: string, index: number) => {
  const isFirstCardNumbers = index === 0;
  if (isFirstCardNumbers && validateCardBrandNumber(inputValue)) {
    return {
      error: true,
      errorMessage: '유효한 카드 브랜드 번호를 입력해주세요.',
    };
  }

  if (validateNaN(inputValue)) {
    return {
      error: true,
      errorMessage: '숫자만 입력 가능합니다.',
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

// 숫자 외의 값이 입력되는 경우 검증
export const validateNaN = (inputValue: string) => isNaN(Number(inputValue));

// 입력된 번호의 개수가 maxLength보다 작은 경우 검증
export const validateInputValueLength = (inputValue: string, InputMaxLength: number) =>
  inputValue.length < InputMaxLength;

// cardBrand 번호가 맞는지 검증
export const validateCardBrandNumber = (inputValue: string) => {
  if (inputValue.startsWith('4')) return false;

  const copy = Number(inputValue.slice(0, 2));
  if (copy >= 51 && copy <= 55) return false;

  return true;
};
