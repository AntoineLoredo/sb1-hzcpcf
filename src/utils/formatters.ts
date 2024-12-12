export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function formatWeight(weight: number): string {
  return `${weight} kg`;
}

export function formatDimensions(length: number, width: number, height: number, unit: string): string {
  return `${length}×${width}×${height} ${unit}`;
}