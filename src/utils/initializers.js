export const initializeStockData = () => ({
  currentStock: 0,
  incomingStock: 0,
  reservedStock: 0,
  availableStock: 0,
  lastStockUpdate: new Date().toISOString(),
  stockLocations: []
});

export const initializePricingData = () => ({
  basePrice: 0,
  recommendedRetailPrice: 0,
  minimumMargin: 0.4,
  priceHistory: [],
  countryPrices: {
    FR: 0,
    DE: 0,
    IT: 0,
    ES: 0,
    UK: 0
  }
});

export const initializeSupplierData = () => ({
  mainSupplier: '',
  alternativeSuppliers: [],
  lastPurchaseDate: '',
  lastPurchasePrice: 0,
  preferredSupplierRanking: 0
});

export const initializeQualityData = () => ({
  defectRate: 0,
  returnRate: 0,
  averageLifespan: 0,
  warrantyPeriod: 0,
  qualityChecks: []
});