import { useState } from 'react';
import { CardBrandOrNone, CardNumbers, ValidatorResult } from '../types';
import {
  detectCardBrand,
  getSegmentLengths,
  joinUntilEmpty,
  replaceSegmentAt,
  reshapeCardNumbers,
} from '../utils/cardBrand';
import { isCardNumbersComplete } from '../utils/formStatus';
import { makeCardNumbersValidator } from '../utils/validate';

export interface UseCardNumbersResult {
  value: CardNumbers;
  cardBrand: CardBrandOrNone;
  segmentLengths: readonly number[];
  isComplete: boolean;
  validator: (inputValue: string, index: number) => ValidatorResult;
  handleSegmentChange: (inputValue: string, index: number) => void;
}

export default function useCardNumbers(): UseCardNumbersResult {
  const [value, setValue] = useState<CardNumbers>(['', '', '', '']);

  const cardBrand = detectCardBrand(joinUntilEmpty(value));
  const segmentLengths = getSegmentLengths(cardBrand);
  const isComplete = isCardNumbersComplete(value);
  const validator = makeCardNumbersValidator(value, segmentLengths);

  const handleSegmentChange = (inputValue: string, index: number) => {
    const next = replaceSegmentAt(value, index, inputValue);

    const newBrand = detectCardBrand(joinUntilEmpty(next));
    const newSegmentLengths = getSegmentLengths(newBrand);

    const adjusted: CardNumbers =
      next.length === newSegmentLengths.length ? next : reshapeCardNumbers(next, newSegmentLengths);

    setValue(adjusted);
  };

  return { value, cardBrand, segmentLengths, isComplete, validator, handleSegmentChange };
}
