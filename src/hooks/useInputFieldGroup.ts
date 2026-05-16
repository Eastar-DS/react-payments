import { useRef, useState } from 'react';
import { ValidatorResult } from '../types';

interface UseInputFieldGroupProps {
  values: readonly string[];
  fieldMaxLengths: readonly number[];
  validator: (inputValue: string, index: number) => ValidatorResult;
  onChange: (inputValue: string, index: number) => void;
  inputBlocker?: (inputValue: string) => boolean;
}

interface UseInputFieldGroupResult {
  errorMessage: string;
  isErrors: boolean[];
  refCallback: (el: HTMLInputElement | null, index: number) => void
  handleInputFieldChange: (inputValue: string, index: number) => void
  handleFocus: (index: number) => void;
  handleBlur: () => void;
}

export default function useInputFieldGroup({
  values,
  fieldMaxLengths,
  validator,
  onChange,
  inputBlocker,
}: UseInputFieldGroupProps): UseInputFieldGroupResult {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  
  const errorMessage =
  focusedIndex !== null ? validator(values[focusedIndex], focusedIndex).errorMessage : '';
  
  const isErrors = values.map((value, index) => value.length > 0 && validator(value, index).error);
  
  const refCallback = (el: HTMLInputElement | null, index: number) => {inputRefs.current[index] = el;};

  const focusNextField = (inputValue: string, currentIndex: number) => {
    const isFilled = inputValue.length === fieldMaxLengths[currentIndex];
    const hasNext = currentIndex < values.length - 1;
    if (isFilled && hasNext) {
      inputRefs.current[currentIndex + 1]?.focus();
    }
  };

  const handleInputFieldChange = (inputValue: string, index: number) => {
    if(inputBlocker?.(inputValue)) return;
    onChange(inputValue, index);
    focusNextField(inputValue, index);
  };

  const handleFocus = (index: number) => setFocusedIndex(index);
  const handleBlur = () => setFocusedIndex(null);

  return { errorMessage, isErrors, refCallback, handleInputFieldChange, handleFocus, handleBlur };
}
