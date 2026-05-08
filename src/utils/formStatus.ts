import { CARD_BRAND_RULES } from "../constants";
import { CardNumbers } from "../types";
import { detectCardBrand, joinUntilEmpty } from "./cardBrand";

export function isCardNumbersComplete(cardNumbers: CardNumbers): boolean {
  const value = joinUntilEmpty(cardNumbers).replace(/\D/g, '');
  const brand = detectCardBrand(value);
  if (brand === 'NONE') return false;
  return value.length === CARD_BRAND_RULES[brand].totalLength;
}