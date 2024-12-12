export function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

export function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function formatWeight(weight) {
  return `${weight} kg`;
}

export function formatDimensions(length, width, height, unit) {
  return `${length}×${width}×${height} ${unit}`;
}