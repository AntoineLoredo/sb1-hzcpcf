import { defineStore } from 'pinia';
import { mockProducts } from '/src/data/mockData';
import { mockSales } from '/src/data/mockSales';
import { mockPurchaseOrders } from '/src/data/mockPurchaseOrders';

export const useMainStore = defineStore('main', {
  state: () => ({
    products: mockProducts,
    sales: mockSales,
    purchaseOrders: mockPurchaseOrders,
    prices: {},
    bundles: [],
  }),

  actions: {
    // Product actions
    addProduct(product) {
      this.products.push(product);
    },
    updateProduct(product) {
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
      }
    },

    // Bundle actions
    addBundle(bundle) {
      this.bundles.push(bundle);
    },
    updateBundle(bundle) {
      const index = this.bundles.findIndex((b) => b.id === bundle.id);
      if (index !== -1) {
        this.bundles[index] = bundle;
      }
    },
    deleteBundle(bundleId) {
      this.bundles = this.bundles.filter((b) => b.id !== bundleId);
    },

    // Price actions
    updatePrice(sku, country, price) {
      if (!this.prices[sku]) {
        this.prices[sku] = {};
      }
      this.prices[sku][country] = price;
    },

    // Sale actions
    addSale(sale) {
      this.sales.push(sale);
    },
    updateSale(sale) {
      const index = this.sales.findIndex((s) => s.id === sale.id);
      if (index !== -1) {
        this.sales[index] = sale;
      }
    },

    // Purchase order actions
    addPurchaseOrder(order) {
      this.purchaseOrders.push(order);
    },
    updatePurchaseOrder(order) {
      const index = this.purchaseOrders.findIndex((o) => o.id === order.id);
      if (index !== -1) {
        this.purchaseOrders[index] = order;
      }
    },
  },
});
