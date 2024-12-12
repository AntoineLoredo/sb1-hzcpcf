export function calculateForecast(products, sales) {
  const variants = products.flatMap(product => product.variants);
  const weeklySales = calculateWeeklySales(sales);
  
  return variants.map(variant => {
    const averageSalesPerWeek = weeklySales[variant.sku] || 0;
    const safetyStock = variant.moq * variant.safetyStockWeeks;
    let currentStock = variant.stockData.currentStock;
    
    const weeklyForecast = Array.from({ length: 23 }, () => {
      currentStock = currentStock - averageSalesPerWeek;
      return currentStock;
    });

    return {
      sku: variant.sku,
      supplier: variant.supplier,
      existingStock: variant.stockData.currentStock,
      averageSalesPerWeek,
      safetyStock,
      weeklyForecast
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