```typescript
import { defineStore } from 'pinia';
import type { Bundle } from '~/types/bundle';

interface BundleState {
  bundles: Bundle[];
}

export const useBundleStore = defineStore('bundles', {
  state: (): BundleState => ({
    bundles: []
  }),

  actions: {
    addBundle(bundle: Bundle) {
      this.bundles.push(bundle);
    },

    updateBundle(bundle: Bundle) {
      const index = this.bundles.findIndex(b => b.id === bundle.id);
      if (index !== -1) {
        this.bundles[index] = bundle;
      }
    },

    deleteBundle(bundleId: string) {
      this.bundles = this.bundles.filter(b => b.id !== bundleId);
    }
  }
});
```