export function formatNumber(num: number): string {
  if (Math.abs(num) < 1e-10) return '0';
  
  // Convert to string with high precision
  const str = num.toPrecision(12);
  
  // Parse back to number to remove trailing zeros
  const parsed = parseFloat(str);
  
  // Format with at least 4 decimal places
  const formatted = parsed.toFixed(4);
  
  // Remove trailing zeros after decimal point, but keep at least 4 digits
  return formatted.replace(/\.?0+$/, '');
}

export function isValidNumber(value: string): boolean {
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
}