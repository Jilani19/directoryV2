export function formatCurrency(value: string | number | undefined | null, currencyCode = 'USD'): string {
  if (value === undefined || value === null || value === '' || value === 'N/A') return 'Data unavailable';

  // Clean the input, extract only digits
  const numString = String(value).replace(/[^0-9.]/g, '');
  const num = parseFloat(numString);

  if (isNaN(num)) return String(value);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (num >= 1e12) {
    return `${formatter.format(num / 1e12)} Trillion`;
  }
  if (num >= 1e9) {
    return `${formatter.format(num / 1e9)} Billion`;
  }
  if (num >= 1e6) {
    return `${formatter.format(num / 1e6)} Million`;
  }
  
  return formatter.format(num);
}

export function formatNumber(value: string | number | undefined | null): string {
  if (value === undefined || value === null || value === '' || value === 'N/A') return 'Data unavailable';

  const numString = String(value).replace(/[^0-9.]/g, '');
  const num = parseFloat(numString);

  if (isNaN(num)) return String(value);

  return new Intl.NumberFormat('en-US').format(num);
}
