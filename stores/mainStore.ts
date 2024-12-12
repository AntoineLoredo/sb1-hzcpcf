```typescript
import { defineStore } from 'pinia';
import { mockProducts } from '~/data/mockData';
import { mockSales } from '~/data/mockSales';
import { mockPurchaseOrders } from '~/data/mockPurchaseOrders';
import type { Product } from '~/types/product';
import type { Sale } from '~/types/sale';
import type { PurchaseOrder } from '~/types/purchaseOrder';

interface MainState {
  products: Product[];
  sales: Sale[];
  purchaseOrders: PurchaseOrder[];
  prices: Record<string, Record<string, number>>;
}

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    products: mockProducts,
    sales: mockSales,
    purchaseOrders: mockPurchaseOrders,
    prices: {},
  }),

  getters: {
    allVariants: (state) => state.products.flatMap((p) => p.variants),

    uniqueSuppliers: (state) => {
      const suppliers = new Set<string>();
      state.products.forEach((product) => {
        product.variants.forEach((variant) => {
          suppliers.add(variant.supplier);
        });
      });
      return Array.from(suppliers).sort();
    },
  },

  actions: {
    addProduct(product: Product) {
      this.products.push(product);
    },

    updateProduct(product: Product) {
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
      }
    },

    updatePrice(sku: string, country: string, price: number) {
      if (!this.prices[sku]) {
        this.prices[sku] = {};
      }
      this.prices[sku][country] = price;
    },

    updatePrices(newPrices: Record<string, Record<string, number>>) {
      this.prices = { ...this.prices, ...newPrices };
    },
  },
});
```