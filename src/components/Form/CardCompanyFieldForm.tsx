import { useEffect, useRef, useState } from "react";
import { KOREAN_CARD_COMPANIES } from "../../constants";
import { KoreanCardCompany } from "../../types";
import Label from '../Common/Label/Label';
import styled from "@emotion/styled";

interface CardCompanyFieldFormProps {
  id: string;
  label: string;
  placeholder: string;
  value: KoreanCardCompany | null;
  onChange: (company: KoreanCardCompany) => void;
}

const COMPANIES = Object.entries(KOREAN_CARD_COMPANIES) as Array<
  [KoreanCardCompany, { label: string; color: string }]
>;

export default function CardCompanyFieldForm({
  id,
  label,
  placeholder,
  value,
  onChange,
}: CardCompanyFieldFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭/ESC 감지 — DOM 이벤트 동기화이므로 useEffect
  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const selectedLabel = value ? KOREAN_CARD_COMPANIES[value].label : '';

  return (
    <FormContainer>
      <Label htmlFor={id}>{label}</Label>

      <DropdownContainer ref={containerRef}>
        <SelectButton
          id={id}
          type="button"
          $isOpen={isOpen}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <SelectText $hasValue={value !== null}>{selectedLabel || placeholder}</SelectText>
          <Caret $isOpen={isOpen}>▾</Caret>
        </SelectButton>

        {isOpen && (
          <OptionList role="listbox">
            {COMPANIES.map(([key, { label }]) => (
              <Option
                key={key}
                type="button"
                role="option"
                aria-selected={value === key}
                onClick={() => {
                  onChange(key);
                  setIsOpen(false);
                }}
              >
                {label}
              </Option>
            ))}
          </OptionList>
        )}
      </DropdownContainer>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  padding: 0 12px;
  background: #fff;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? '#000' : '#ACACAC')};
  border-radius: 2px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const SelectText = styled.span<{ $hasValue: boolean }>`
  font-size: 11px;
  color: ${({ $hasValue }) => ($hasValue ? '#000' : '#ACACAC')};
`;

const Caret = styled.span<{ $isOpen: boolean }>`
  font-size: 10px;
  color: #4f4f4f;
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform 0.15s ease;
`;

const OptionList = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 252px;
  margin: 0;
  padding: 4px 0;
  overflow-y: auto;
  list-style: none;
  background: #fff;
  border: 1px solid #acacac;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 10;
`;

const Option = styled.button`
  display: block;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 12px;
  color: #4f4f4f;

  &:hover {
    background: #f7f7f7;
  }
  &:focus {
    outline: none;
    background: #f0f0f0;
  }
`;
