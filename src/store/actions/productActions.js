export const productActions = (set) => ({
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
    
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === product.id ? product : p
      ),
    })),
});