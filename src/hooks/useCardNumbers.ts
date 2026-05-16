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
  cardNumbers: CardNumbers;
  cardBrand: CardBrandOrNone;
  segmentLengths: readonly number[];
  isComplete: boolean;
  validator: (value: string, index: number) => ValidatorResult;
  handleSegmentChange: (value: string, index: number) => void;
}

export default function useCardNumbers(): UseCardNumbersResult {
  const [cardNumbers, setCardNumbers] = useState<CardNumbers>(['', '', '', '']);

  const cardBrand = detectCardBrand(joinUntilEmpty(cardNumbers));
  const segmentLengths = getSegmentLengths(cardBrand);
  const isComplete = isCardNumbersComplete(cardNumbers);
  const validator = makeCardNumbersValidator(cardNumbers, segmentLengths);

  const handleSegmentChange = (value: string, index: number) => {
    const next = replaceSegmentAt(cardNumbers, index, value);

    const newBrand = detectCardBrand(joinUntilEmpty(next));
    const newSegmentLengths = getSegmentLengths(newBrand);

    const adjusted: CardNumbers =
      next.length === newSegmentLengths.length ? next : reshapeCardNumbers(next, newSegmentLengths);

    setCardNumbers(adjusted);
  };

  return { cardNumbers, cardBrand, segmentLengths, isComplete, validator, handleSegmentChange };
}
