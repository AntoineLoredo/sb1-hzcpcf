```js
import { defineStore } from 'pinia';

export const useBundleStore = defineStore('bundles', {
  state: () => ({
    bundles: []
  }),

  actions: {
    addBundle(bundle) {
      this.bundles.push(bundle);
    },

    updateBundle(bundle) {
      const index = this.bundles.findIndex(b => b.id === bundle.id);
      if (index !== -1) {
        this.bundles[index] = bundle;
      }
    },

    deleteBundle(bundleId) {
      this.bundles = this.bundles.filter(b => b.id !== bundleId);
    }
  }
});
```