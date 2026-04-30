import styled from '@emotion/styled';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InputField from '../InputField/InputField';
import Label from '../Label/Label';
import InputFieldLayout from '../../Layout/InputFieldLayout';

export default function InputFieldForm() {
  return (
    <InputFieldLayout
      label={<Label htmlFor="asdf">카드 번호</Label>}
      inputs={
        <InputFieldWrapper>
          <InputField id="asdf" isError={false} /> <InputField isError={false} />
          <InputField isError={false} /> <InputField isError={false} />
        </InputFieldWrapper>
      }
      errorMessage={<ErrorMessage>asdf</ErrorMessage>}
    />
  );
}

const InputFieldWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
