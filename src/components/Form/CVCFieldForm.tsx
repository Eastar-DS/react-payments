import { ChangeEvent, useState } from 'react';
import { cvcValidator } from '../../utils/validate';
import InputFieldForm from '../Common/Form/InputFieldForm';

export default function CVCFieldForm() {
  const [cvcNumbers, setCVCNumbers] = useState<string>('');

  const handleCVCNumbersChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCVCNumbers(e.target.value);
  };

  return (
    <InputFieldForm<string>
      id="cvcNumber"
      label="CVC"
      fieldMaxLength={3}
      value={cvcNumbers}
      validator={cvcValidator}
      onChange={handleCVCNumbersChange}
    />
  );
}
