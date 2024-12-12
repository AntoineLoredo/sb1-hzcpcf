export const mockSales = [
  {
    id: '1',
    date: new Date('2024-03-15'),
    orderNumber: 'ORD-2024-001',
    customer: 'John Doe',
    items: [
      {
        id: '1-1',
        sku: 'SOFA-BLK-3S',
        quantity: 1,
        grossPrice: 1299.99,
        discount: 100,
        totalPrice: 1199.99
      },
      {
        id: '1-2',
        sku: 'BED-OAK-Q',
        quantity: 1,
        grossPrice: 899.99,
        discount: 50,
        totalPrice: 849.99
      }
    ],
    totalAmount: 2049.98
  },
  {
    id: '2',
    date: new Date('2024-03-16'),
    orderNumber: 'ORD-2024-002',
    customer: 'Jane Smith',
    items: [
      {
        id: '2-1',
        sku: 'SOFA-BRN-3S',
        quantity: 1,
        grossPrice: 1299.99,
        discount: 150,
        totalPrice: 1149.99
      }
    ],
    totalAmount: 1149.99
  }
];