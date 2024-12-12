export const saleActions = (set) => ({
  addSale: (sale) =>
    set((state) => ({ sales: [...state.sales, sale] })),

  updateSale: (sale) =>
    set((state) => ({
      sales: state.sales.map((s) =>
        s.id === sale.id ? sale : s
      ),
    })),
});