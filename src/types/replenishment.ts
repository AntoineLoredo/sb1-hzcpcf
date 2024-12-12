export interface ReplenishmentData {
  sku: string;
  variantName: string;
  supplier: string;
  averageSalesPerWeek: number;
  minStockDate: Date;
  orderQuantity: number;
  suggestedOrderDate: Date;
}