export type Product = {
  id: string;
  sku: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  materials: string[];
  imageUrl: string;
  stock: number;
  alertThreshold: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'reorder_in_progress';
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type StockMovement = {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  date: Date;
  reason: string;
};

export type PurchaseOrder = {
  id: string;
  productId: string;
  quantity: number;
  status: 'pending' | 'ordered' | 'received';
  orderDate: Date;
  estimatedDelivery: Date;
  supplierName: string;
};