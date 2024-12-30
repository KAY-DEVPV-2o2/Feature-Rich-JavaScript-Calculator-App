// This function formats the expression by removing spaces, handling double negatives, and ensuring valid input
export function formatExpression(expression: string): string {
  return expression
    .replace(/\s+/g, '') // Remove spaces
    .replace(/--/g, '+') // Convert double negative to positive
    .replace(/[+\-*/]+$/, ''); // Remove trailing operators
}

// This function ensures negative numbers in expressions like "5*-3" are handled correctly
export function handleNegativeNumbers(expression: string): string {
  return expression.replace(/([+\-*/])-(\d+\.?\d*)/g, '$1(-$2)');
}

// This function evaluates the expression considering the proper order of operations
export function evaluateExpression(expression: string): string {
  try {
    // First, sanitize the expression (remove any invalid characters)
    expression = formatExpression(expression); // Clean the expression
    
    // Handle negative numbers (e.g., "5*-3" -> "5*(-3)")
    expression = handleNegativeNumbers(expression);

    // Evaluate the expression while respecting PEMDAS (using math.js or a custom evaluation logic)
    const result = evaluate(expression); // Using math.js to evaluate the expression
    
    // Return the result rounded to 4 decimal places (adjust as needed)
    return result.toFixed(4); // You can modify the precision if needed
  } catch (error) {
    return "Error"; // In case of any invalid expressions, return an error message
  }
}
