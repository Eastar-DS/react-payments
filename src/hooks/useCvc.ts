import { useState } from 'react';
import { isCvcComplete } from '../utils/formStatus';
import { makeCvcValidator } from '../utils/validate';
import { CardBrandOrNone, ValidatorResult } from './../types/index';
import { getCvcLength } from '../utils/cardBrand';

interface UseCvcResult {
  value: string;
  maxLength: 3 | 4;
  isComplete: boolean;
  validator: (inputValue: string, index: number) => ValidatorResult;
  handleChange: (inputValue: string) => void;
}

export default function useCvc(cardBrand: CardBrandOrNone): UseCvcResult {
  const [value, setValue] = useState<string>('');
  const maxLength = getCvcLength(cardBrand);
  const isComplete = isCvcComplete(value, cardBrand);
  const validator = makeCvcValidator(cardBrand);

  return { value, maxLength, isComplete, validator, handleChange: setValue };
}
