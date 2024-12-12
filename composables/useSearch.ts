```typescript
import { ref } from 'vue';

export function useSearch() {
  const searchTerm = ref('');
  const selectedSupplier = ref('');

  const updateSearch = (value: string) => {
    searchTerm.value = value;
  };

  const updateSupplier = (value: string) => {
    selectedSupplier.value = value;
  };

  return {
    searchTerm,
    selectedSupplier,
    updateSearch,
    updateSupplier
  };
}
```