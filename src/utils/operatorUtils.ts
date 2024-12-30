export const OPERATORS = ['+', '-', '*', '/'] as const;
export type Operator = typeof OPERATORS[number];

export function isOperator(char: string): boolean {
  return OPERATORS.includes(char as Operator);
}

export function getLastOperator(equation: string): Operator | null {
  const match = equation.match(/[+\-*/]+$/);
  return match ? match[0] as Operator : null;
}

export function shouldHandleNegative(equation: string): boolean {
  return equation === '' || /[+\-*/]$/.test(equation);
}

export function isValidOperatorSequence(sequence: string): boolean {
  // Allow negative numbers but prevent multiple operators
  return !/[+*/]{2,}/.test(sequence) && !/--/.test(sequence);
}