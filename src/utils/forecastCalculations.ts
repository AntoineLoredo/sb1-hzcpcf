import { Product } from '../types/product';
import { Sale } from '../types/sale';
import { ForecastData } from '../types/forecast';

export function calculateForecast(products: Product[], sales: Sale[]): ForecastData[] {
  const variants = products.flatMap(product => product.variants);
  
  // Calculate average weekly sales for each SKU
  const weeklySales = calculateWeeklySales(sales);
  
  return variants.map(variant => {
    const averageSalesPerWeek = weeklySales[variant.sku] || 0;
    const safetyStock = variant.moq * variant.safetyStockWeeks;
    let currentStock = variant.moq; // Initialize with existing stock
    
    // Calculate weekly forecast for the next 23 weeks
    const weeklyForecast = [];
    for (let week = 0; week < 23; week++) {
      currentStock = currentStock - averageSalesPerWeek;
      weeklyForecast.push(currentStock);
    }

    return {
      sku: variant.sku,
      supplier: variant.supplier,
      existingStock: variant.moq,
      averageSalesPerWeek,
      safetyStock,
      weeklyForecast
    };
  });
}

function calculateWeeklySales(sales: Sale[]): { [sku: string]: number } {
  const salesBySku: { [sku: string]: number } = {};
  const weeks = 4; // Calculate average based on last 4 weeks
  
  sales.forEach(sale => {
    sale.items.forEach(item => {
      if (!salesBySku[item.sku]) {
        salesBySku[item.sku] = 0;
      }
      salesBySku[item.sku] += item.quantity;
    });
  });
  
  // Convert total sales to weekly average
  Object.keys(salesBySku).forEach(sku => {
    salesBySku[sku] = salesBySku[sku] / weeks;
  });
  
  return salesBySku;
}