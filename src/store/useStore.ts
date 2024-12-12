import { create } from 'zustand';
import { Product } from '../types/product';
import { Sale } from '../types/sale';
import { PurchaseOrder } from '../types/purchaseOrder';
import { mockProducts } from '../data/mockData';
import { mockSales } from '../data/mockSales';
import { mockPurchaseOrders } from '../data/mockPurchaseOrders';

interface Store {
  products: Product[];
  sales: Sale[];
  purchaseOrders: PurchaseOrder[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  addSale: (sale: Sale) => void;
  updateSale: (sale: Sale) => void;
  addPurchaseOrder: (order: PurchaseOrder) => void;
  updatePurchaseOrder: (order: PurchaseOrder) => void;
}

export const useStore = create<Store>((set) => ({
  products: mockProducts,
  sales: mockSales,
  purchaseOrders: mockPurchaseOrders,
  
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
    
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === product.id ? product : p
      ),
    })),

  addSale: (sale) =>
    set((state) => ({ sales: [...state.sales, sale] })),

  updateSale: (sale) =>
    set((state) => ({
      sales: state.sales.map((s) =>
        s.id === sale.id ? sale : s
      ),
    })),

  addPurchaseOrder: (order) =>
    set((state) => ({ purchaseOrders: [...state.purchaseOrders, order] })),

  updatePurchaseOrder: (order) =>
    set((state) => ({
      purchaseOrders: state.purchaseOrders.map((o) =>
        o.id === order.id ? order : o
      ),
    })),
}));