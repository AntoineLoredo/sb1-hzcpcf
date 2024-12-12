export class ReplenishmentData {
  constructor({
    sku,
    variantName,
    supplier,
    averageSalesPerWeek,
    minStockDate,
    orderQuantity,
    suggestedOrderDate
  }) {
    this.sku = sku;
    this.variantName = variantName;
    this.supplier = supplier;
    this.averageSalesPerWeek = averageSalesPerWeek;
    this.minStockDate = minStockDate;
    this.orderQuantity = orderQuantity;
    this.suggestedOrderDate = suggestedOrderDate;
  }
}