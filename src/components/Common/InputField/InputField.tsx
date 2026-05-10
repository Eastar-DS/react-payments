import { ComponentProps, Ref } from 'react';
import styled from '@emotion/styled';

interface InputFieldProps extends ComponentProps<'input'> {
  isError: boolean;
  ref?: Ref<HTMLInputElement>;
}

export default function InputField({ isError, ref, ...props }: InputFieldProps) {
  return <Input ref={ref} $isError={isError} {...props} />;
}

const Input = styled.input<{ $isError: boolean }>`
  width: clamp(72px, 100%, 100%);
  height: 32px;
  padding: 8px;
  border: 1px solid ${({ $isError }) => ($isError ? '#FF3D3D' : '#ACACAC')};
  border-radius: 2px;
  font-size: 11px;
  font-weight: 400;
  color: black;

  &:focus {
    outline: none;
    border-color: ${({ $isError }) => ($isError ? '#FF3D3D' : '#000')};
  }
`;
