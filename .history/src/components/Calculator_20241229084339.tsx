import React, { useState } from 'react';
import { evaluate } from '../utils/calculator';
import Display from './Display';
import Button from './Button';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [lastResult, setLastResult] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldReset) {
      setDisplay(num);
      setEquation('');
      setShouldReset(false);
    } else if (waitingForOperand || display === '0') {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleDecimal = () => {
    if (shouldReset) {
      setDisplay('0.');
      setEquation('');
      setShouldReset(false);
      return;
    }
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (operator: string) => {
    if (shouldReset) {
      setEquation(lastResult + operator);
      setShouldReset(false);
      setWaitingForOperand(true);
      return;
    }

    // Handle negative numbers
    if (operator === '-') {
      if (equation === '' || /[+\-*/]$/.test(equation)) {
        setDisplay('-');
        setWaitingForOperand(false);
        return;
      }
    }

    // Handle consecutive operators
    if (waitingForOperand && equation !== '') {
      if (display === '-') {
        setEquation(equation + display);
      } else {
        setEquation(equation.replace(/[+\-*/]+$/, operator));
      }
    } else {
      setEquation(equation + display + operator);
      setWaitingForOperand(true);
    }
  };

  const handleEquals = () => {
    if (waitingForOperand && display !== '-') return;

    const finalEquation = equation + display;
    try {
      const result = evaluate(finalEquation);
      setDisplay(result);
      setLastResult(result);
      setEquation('');
      setShouldReset(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setLastResult('');
    setWaitingForOperand(false);
    setShouldReset(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="calculator-container bg-gray-800 p-6 rounded-2xl shadow-2xl border border-blue-500/20 backdrop-blur-sm max-w-xs w-full">
        <Display value={display} equation={equation} />
        
        <div className="grid grid-cols-4 gap-2 mt-4">
          <Button id="clear" onClick={handleClear} variant="function" className="col-span-2">
            AC
          </Button>
          <Button id="divide" onClick={() => handleOperator('/')} variant="operator">
            ÷
          </Button>
          <Button id="multiply" onClick={() => handleOperator('*')} variant="operator">
            ×
          </Button>

          <Button id="seven" onClick={() => handleNumber('7')}>7</Button>
          <Button id="eight" onClick={() => handleNumber('8')}>8</Button>
          <Button id="nine" onClick={() => handleNumber('9')}>9</Button>
          <Button id="subtract" onClick={() => handleOperator('-')} variant="operator">
            −
          </Button>

          <Button id="four" onClick={() => handleNumber('4')}>4</Button>
          <Button id="five" onClick={() => handleNumber('5')}>5</Button>
          <Button id="six" onClick={() => handleNumber('6')}>6</Button>
          <Button id="add" onClick={() => handleOperator('+')} variant="operator">
            +
          </Button>

          <Button id="one" onClick={() => handleNumber('1')}>1</Button>
          <Button id="two" onClick={() => handleNumber('2')}>2</Button>
          <Button id="three" onClick={() => handleNumber('3')}>3</Button>
          <Button id="equals" onClick={handleEquals} variant="equals" className="row-span-2">
            =
          </Button>

          <Button id="zero" onClick={() => handleNumber('0')} className="col-span-2">
            0
          </Button>
          <Button id="decimal" onClick={handleDecimal}>.</Button>
        </div>
      </div>
      
      <footer className="mt-8 text-center text-blue-400">
        <p>Developed By K-Devp-V-2o2</p>
        <p>© Copyright 2024</p>
      </footer>
    </div>
  );
}