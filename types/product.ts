```typescript
export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  option1Type: string;
  option1Value: string;
  option2Type?: string;
  option2Value?: string;
  option3Type?: string;
  option3Value?: string;
  version: number;
  status: 'active' | 'inactive' | 'discontinued';
  isPrimary: boolean;
  supplier: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  isBundle: boolean;
  isFromRawMaterial: boolean;
  moq: number;
  leadTimeWeeks: number;
  safetyStockWeeks: number;
  purchasePrice: number;
  logisticCost: number;
  imageUrl: string;
  stockData: {
    currentStock: number;
    incomingStock: number;
    reservedStock: number;
    availableStock: number;
    lastStockUpdate: string;
    stockLocations: Array<{
      name: string;
      quantity: number;
    }>;
  };
  salesData: {
    lastMonthSales: number;
    last3MonthsSales: number;
    averageMonthlyDemand: number;
    seasonalityFactor: number;
  };
  pricingData: {
    basePrice: number;
    recommendedRetailPrice: number;
    minimumMargin: number;
    priceHistory: Array<{
      date: string;
      price: number;
    }>;
    countryPrices: {
      [key: string]: number;
    };
  };
  supplierData: {
    mainSupplier: string;
    alternativeSuppliers: Array<{
      name: string;
      leadTime: number;
      moq: number;
    }>;
    lastPurchaseDate: string;
    lastPurchasePrice: number;
    preferredSupplierRanking: number;
  };
  qualityData: {
    defectRate: number;
    returnRate: number;
    averageLifespan: number;
    warrantyPeriod: number;
    qualityChecks: Array<{
      name: string;
      score: number;
    }>;
  };
}

export interface Product {
  id: string;
  name: string;
  category: string;
  ean: string;
  description: string;
  variants: ProductVariant[];
}
```