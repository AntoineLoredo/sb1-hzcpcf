```typescript
export interface SaleItem {
  id: string;
  sku: string;
  quantity: number;
  grossPrice: number;
  discount: number;
  totalPrice: number;
}

export interface Sale {
  id: string;
  date: Date;
  orderNumber: string;
  customer: string;
  items: SaleItem[];
  totalAmount: number;
}
```