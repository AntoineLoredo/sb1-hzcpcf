import { Product } from '../types';

export function calculateStockValue(products: Product[]): number {
  return products.reduce((sum, product) => sum + product.price * product.stock, 0);
}

export function getStockStatus(stock: number, threshold: number): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (stock === 0) return 'out_of_stock';
  if (stock <= threshold) return 'low_stock';
  return 'in_stock';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}