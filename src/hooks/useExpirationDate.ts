import { useState } from 'react';
import { ExpirationDate, ExpirationDateSegments, ValidatorResult } from '../types';
import { isExpirationDateComplete } from '../utils/formStatus';
import { makeExpirationDateValidator } from '../utils/validate';

interface UseExpirationDateResult {
  value: ExpirationDate;
  expirationDateSegments: ExpirationDateSegments;
  isComplete: boolean;
  validator: (inputValue: string, index: number) => ValidatorResult;
  handleSegmentChange: (inputValue: string, index: number) => void;
}

export default function useExpirationDate(): UseExpirationDateResult {
  const [value, setValue] = useState<ExpirationDate>({ month: '', year: '' });
  const expirationDateSegments = [value.month, value.year] as ExpirationDateSegments;
  const isComplete = isExpirationDateComplete(value);
  const validator = makeExpirationDateValidator(value);

  const handleSegmentChange = (inputValue: string, index: number) => {
    const key = index === 0 ? 'month' : 'year';

    setValue((prev) => {
      const newExpirationDate = { ...prev };
      newExpirationDate[key] = inputValue;
      return newExpirationDate;
    });
  };
  return { value, expirationDateSegments, isComplete, validator, handleSegmentChange };
}
