```js
import { defineStore } from 'pinia';
import { mockProducts } from '~/data/mockData';
import { mockSales } from '~/data/mockSales';
import { mockPurchaseOrders } from '~/data/mockPurchaseOrders';

export const useMainStore = defineStore('main', {
  state: () => ({
    products: mockProducts,
    sales: mockSales,
    purchaseOrders: mockPurchaseOrders,
    prices: {},
  }),

  getters: {
    allVariants: (state) => state.products.flatMap((p) => p.variants),

    uniqueSuppliers: (state) => {
      const suppliers = new Set();
      state.products.forEach((product) => {
        product.variants.forEach((variant) => {
          suppliers.add(variant.supplier);
        });
      });
      return Array.from(suppliers).sort();
    },
  },

  actions: {
    addProduct(product) {
      this.products.push(product);
    },

    updateProduct(product) {
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
      }
    },

    updatePrice(sku, country, price) {
      if (!this.prices[sku]) {
        this.prices[sku] = {};
      }
      this.prices[sku][country] = price;
    },

    updatePrices(newPrices) {
      this.prices = { ...this.prices, ...newPrices };
    },
  },
});
```