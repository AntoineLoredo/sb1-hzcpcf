import { ProductVariant } from './product';

export interface PurchaseOrder {
  id: string;
  date: Date;
  orderNumber: string;
  supplier: string;
  status: 'pending' | 'ordered' | 'received';
  items: PurchaseOrderItem[];
  totalAmount: number;
  estimatedDeliveryDate: Date;
  deliveryLocation: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface PurchaseOrderItem {
  id: string;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}