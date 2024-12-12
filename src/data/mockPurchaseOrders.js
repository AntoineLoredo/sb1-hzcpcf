import { mockProducts } from './mockData';

export const mockPurchaseOrders = [
  {
    id: '1',
    date: new Date('2024-03-15'),
    orderNumber: 'PO-2024-001',
    supplier: 'Luxury Furniture Co.',
    status: 'ordered',
    items: [
      {
        id: '1-1',
        variant: mockProducts[0].variants[0],
        quantity: 5,
        unitPrice: 899.99,
        totalPrice: 4499.95
      }
    ],
    totalAmount: 4499.95,
    estimatedDeliveryDate: new Date('2024-04-26'),
    deliveryLocation: {
      name: 'Entrepôt Principal',
      address: '123 rue de la Logistique',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    }
  }
];