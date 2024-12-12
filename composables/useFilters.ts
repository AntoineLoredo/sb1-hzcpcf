```typescript
import { computed } from 'vue';
import type { Product } from '~/types/product';

export function useFilters(
  products: Product[],
  searchTerm: string,
  selectedSupplier: string
) {
  const filteredProducts = computed(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.variants.some(v => 
          v.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSupplier = !selectedSupplier || 
        product.variants.some(v => v.supplier === selectedSupplier);

      return matchesSearch && matchesSupplier;
    });
  });

  return {
    filteredProducts
  };
}
```