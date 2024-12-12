import { addWeeks } from 'date-fns';

export function calculateReplenishment(products, sales) {
  const variants = products.flatMap(product => product.variants);
  const weeklySales = calculateWeeklySales(sales);
  const today = new Date();

  return variants.map(variant => {
    const averageSalesPerWeek = weeklySales[variant.sku] || 0;
    const safetyStock = variant.moq * variant.safetyStockWeeks;
    let currentStock = variant.moq;
    
    let weeksUntilMinStock = 0;
    while (currentStock > safetyStock) {
      currentStock -= averageSalesPerWeek;
      weeksUntilMinStock++;
    }

    const minStockDate = addWeeks(today, weeksUntilMinStock);
    const suggestedOrderDate = addWeeks(minStockDate, -variant.leadTimeWeeks);

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

function calculateWeeklySales(sales) {
  const salesBySku = {};
  const weeks = 4;
  
  sales.forEach(sale => {
    sale.items.forEach(item => {
      if (!salesBySku[item.sku]) {
        salesBySku[item.sku] = 0;
      }
      salesBySku[item.sku] += item.quantity;
    });
  });
  
  Object.keys(salesBySku).forEach(sku => {
    salesBySku[sku] = salesBySku[sku] / weeks;
  });
  
  return salesBySku;
}