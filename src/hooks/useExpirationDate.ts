import { useState } from 'react';
import { ExpirationDate, ExpirationDateSegments, ValidatorResult } from '../types';
import { isExpirationDateComplete } from '../utils/formStatus';
import { makeExpirationDateValidator } from '../utils/validate';

interface UseExpirationDateResult {
  value: ExpirationDate;
  expirationDateSegments: ExpirationDateSegments;
  isComplete: boolean;
  validator: (value: string, index: number) => ValidatorResult;
  handleSegmentChange: (value: string, index: number) => void;
}

export default function useExpirationDate(): UseExpirationDateResult {
  const [value, setValue] = useState<ExpirationDate>({ month: '', year: '' });
  const expirationDateSegments = [value.month, value.year] as ExpirationDateSegments;
  const isComplete = isExpirationDateComplete(value);
  const validator = makeExpirationDateValidator(value);

  const handleSegmentChange = (value: string, index: number) => {
    const key = index === 0 ? 'month' : 'year';

    setValue((prev) => {
      const newExpirationDate = { ...prev };
      newExpirationDate[key] = value;
      return newExpirationDate;
    });
  };
  return { value, expirationDateSegments, isComplete, validator, handleSegmentChange };
}
