import { computed } from 'vue';
import { useMainStore } from '~/stores/mainStore';
import type { Product } from '~/types/product';

export function useProducts() {
  const store = useMainStore();
  
  const products = computed(() => store.products);
  
  const filteredProducts = (search = '', supplier = '') => {
    return store.products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.variants.some(v => 
          v.sku.toLowerCase().includes(search.toLowerCase()) ||
          v.name.toLowerCase().includes(search.toLowerCase())
        );

      const matchesSupplier = !supplier || 
        product.variants.some(v => v.supplier === supplier);

      return matchesSearch && matchesSupplier;
    });
  };

  const addProduct = (product: Product) => {
    store.addProduct(product);
  };

  const updateProduct = (product: Product) => {
    store.updateProduct(product);
  };

  return {
    products,
    filteredProducts,
    addProduct,
    updateProduct
  };
}