export interface CalculatorState {
  display: string;
  equation: string;
  lastResult: string;
  waitingForOperand: boolean;
  startNewNumber: boolean;
}

export const initialState: CalculatorState = {
  display: '0',
  equation: '',
  lastResult: '',
  waitingForOperand: false,
  startNewNumber: false,
};