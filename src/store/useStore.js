import { create } from 'zustand';
import { mockProducts } from '../data/mockData';
import { mockSales } from '../data/mockSales';
import { mockPurchaseOrders } from '../data/mockPurchaseOrders';
import { productActions } from './actions/productActions';
import { saleActions } from './actions/saleActions';
import { purchaseOrderActions } from './actions/purchaseOrderActions';
import { priceActions } from './actions/priceActions';
import { bundleActions } from './actions/bundleActions';

export const useStore = create((set) => ({
  // Initial state
  products: mockProducts,
  sales: mockSales,
  purchaseOrders: mockPurchaseOrders,
  prices: {},
  bundles: [],
  
  // Actions
  ...productActions(set),
  ...saleActions(set),
  ...purchaseOrderActions(set),
  ...priceActions(set),
  ...bundleActions(set),
}));