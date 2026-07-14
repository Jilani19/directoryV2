export function formatCurrency(value: string | number | null | undefined, currency: string = 'USD'): string {
  if (!value) return '';
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
  if (isNaN(num)) return String(value);

  const prefix = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '';

  if (num >= 1e12) {
    return `${prefix}${(num / 1e12).toFixed(2)}T`;
  }
  if (num >= 1e9) {
    return `${prefix}${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `${prefix}${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `${prefix}${(num / 1e3).toFixed(2)}K`;
  }
  return `${prefix}${num.toLocaleString()}`;
}
