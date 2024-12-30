import { formatNumber, isValidNumber } from './numberUtils';
import { formatExpression } from './expressionUtils';

export function evaluate(expression: string): string {
  if (!expression) return '0';
  
  try {
    // Format and sanitize the expression
    const sanitized = formatExpression(expression);
    
    // Split the expression into tokens
    const tokens = tokenize(sanitized);
    
    // Convert to postfix notation (Shunting Yard Algorithm)
    const postfix = toPostfix(tokens);
    
    // Evaluate postfix expression
    const result = evaluatePostfix(postfix);
    
    if (!isValidNumber(String(result))) {
      return '0';
    }
    
    return formatNumber(result);
  } catch (error) {
    console.error('Evaluation error:', error);
    return '0';
  }
}

function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let number = '';
  
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if ('0123456789.'.includes(char)) {
      number += char;
    } else if ('+-*/()'.includes(char)) {
      if (number) {
        tokens.push(number);
        number = '';
      }
      tokens.push(char);
    }
  }
  if (number) {
    tokens.push(number);
  }
  
  return tokens;
}

function getPrecedence(operator: string): number {
  switch (operator) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
    default:
      return 0;
  }
}

function toPostfix(tokens: string[]): string[] {
  const output: string[] = [];
  const operators: string[] = [];
  
  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      output.push(token);
    } else if ('+-*/'.includes(token)) {
      while (
        operators.length > 0 &&
        getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators.length > 0 && operators[operators.length - 1] !== '(') {
        output.push(operators.pop()!);
      }
      operators.pop(); // Remove '('
    }
  }
  
  while (operators.length > 0) {
    output.push(operators.pop()!);
  }
  
  return output;
}

function evaluatePostfix(tokens: string[]): number {
  const stack: number[] = [];
  
  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
      }
    }
  }
  
  return stack[0];
}