import { Product } from '../types/product';
import { Sale } from '../types/sale';
import { ReplenishmentData } from '../types/replenishment';
import { addWeeks } from 'date-fns';

export function calculateReplenishment(products: Product[], sales: Sale[]): ReplenishmentData[] {
  const variants = products.flatMap(product => product.variants);
  const weeklySales = calculateWeeklySales(sales);
  const today = new Date();

  return variants.map(variant => {
    const averageSalesPerWeek = weeklySales[variant.sku] || 0;
    const safetyStock = variant.moq * variant.safetyStockWeeks;
    let currentStock = variant.moq;
    
    // Calculate when stock will go below safety stock
    let weeksUntilMinStock = 0;
    while (currentStock > safetyStock) {
      currentStock -= averageSalesPerWeek;
      weeksUntilMinStock++;
    }

    // Calculate suggested order date considering lead time
    const minStockDate = addWeeks(today, weeksUntilMinStock);
    const suggestedOrderDate = addWeeks(minStockDate, -variant.leadTimeWeeks);

    // Calculate order quantity based on MOQ and average sales
    const coverageWeeks = variant.leadTimeWeeks + variant.safetyStockWeeks;
    const orderQuantity = Math.max(
      variant.moq,
      Math.ceil(averageSalesPerWeek * coverageWeeks)
    );

    return {
      sku: variant.sku,
      variantName: variant.name,
      supplier: variant.supplier,
      averageSalesPerWeek,
      minStockDate,
      orderQuantity,
      suggestedOrderDate
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