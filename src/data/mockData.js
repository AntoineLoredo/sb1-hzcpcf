export const mockProducts = [
  {
    id: '1',
    name: 'Modern Leather Sofa',
    category: 'Living Room',
    ean: '3664526789012',
    description: 'Elegant leather sofa with multiple configuration options',
    variants: [
      {
        id: '1-1',
        name: 'Modern Leather Sofa - Black - 3 Seater',
        sku: 'SOFA-BLK-3S',
        option1Type: 'Color',
        option1Value: 'Black',
        option2Type: 'Size',
        option2Value: '3 Seater',
        version: 3,
        status: 'active',
        isPrimary: true,
        supplier: 'Luxury Furniture Co.',
        weight: 85,
        dimensions: {
          length: 220,
          width: 95,
          height: 85,
          unit: 'cm'
        },
        isBundle: false,
        isFromRawMaterial: false,
        moq: 1,
        leadTimeWeeks: 6,
        safetyStockWeeks: 4,
        purchasePrice: 999.99,
        logisticCost: 150,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
        stockData: {
          currentStock: 12,
          incomingStock: 5,
          reservedStock: 2,
          availableStock: 10,
          lastStockUpdate: '2024-03-20',
          stockLocations: [
            { name: 'Main Warehouse', quantity: 8 },
            { name: 'Store Paris', quantity: 4 }
          ]
        },
        salesData: {
          lastMonthSales: 8,
          last3MonthsSales: 22,
          averageMonthlyDemand: 7.5,
          seasonalityFactor: 1.2
        },
        pricingData: {
          basePrice: 999.99,
          recommendedRetailPrice: 2499.99,
          minimumMargin: 0.4,
          priceHistory: [
            { date: '2024-01-15', price: 899.99 },
            { date: '2024-02-01', price: 949.99 },
            { date: '2024-03-15', price: 999.99 }
          ],
          countryPrices: {
            FR: 2499.99,
            DE: 2599.99,
            IT: 2449.99,
            ES: 2399.99,
            UK: 2199.99
          }
        },
        supplierData: {
          mainSupplier: 'Luxury Furniture Co.',
          alternativeSuppliers: [
            { name: 'Premium Furniture Ltd', leadTime: 8, moq: 2 },
            { name: 'Euro Furnish', leadTime: 7, moq: 1 }
          ],
          lastPurchaseDate: '2024-02-15',
          lastPurchasePrice: 989.99,
          preferredSupplierRanking: 1
        },
        qualityData: {
          defectRate: 0.02,
          returnRate: 0.03,
          averageLifespan: 60,
          warrantyPeriod: 24,
          qualityChecks: [
            { name: 'Material Quality', score: 4.8 },
            { name: 'Assembly Quality', score: 4.7 },
            { name: 'Finish Quality', score: 4.9 }
          ]
        },
        versionHistory: [
          {
            date: new Date('2024-01-15'),
            version: 1,
            reason: 'initial',
            changes: {},
            previousState: null
          },
          {
            date: new Date('2024-02-01'),
            version: 2,
            reason: 'price_update',
            changes: {
              purchasePrice: {
                from: 849.99,
                to: 899.99
              },
              logisticCost: {
                from: 100,
                to: 120
              }
            }
          },
          {
            date: new Date('2024-03-15'),
            version: 3,
            reason: 'price_update',
            changes: {
              purchasePrice: {
                from: 899.99,
                to: 999.99
              },
              logisticCost: {
                from: 120,
                to: 150
              }
            }
          }
        ]
      }
      // Additional variants...
    ]
  }
  // Additional products...
];