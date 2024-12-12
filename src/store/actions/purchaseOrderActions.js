export const purchaseOrderActions = (set) => ({
  addPurchaseOrder: (order) =>
    set((state) => ({ purchaseOrders: [...state.purchaseOrders, order] })),

  updatePurchaseOrder: (order) =>
    set((state) => ({
      purchaseOrders: state.purchaseOrders.map((o) =>
        o.id === order.id ? order : o
      ),
    })),
});