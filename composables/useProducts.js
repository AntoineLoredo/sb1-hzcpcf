import { useMainStore } from '~/stores/mainStore';

export function useProducts() {
  const store = useMainStore();
  
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

  return {
    products: computed(() => store.products),
    filteredProducts,
    addProduct: store.addProduct,
    updateProduct: store.updateProduct
  };
}