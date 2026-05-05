interface InputFieldConfig {
  sectionTitle: string;
  hintText?: string;
  label: string;
  placeholder: string[];
}

export type { InputFieldConfig };

export type CardNumbersType = [string, string, string, string];
export type ExpirationDateType = { month: string; year: string };
export type ExpirationDateListType = [string, string];

export type ValidatorResult = {
  error: boolean;
  errorMessage: string;
};

export type ValidationResult = ValidatorResult & {
  block: boolean;
};
