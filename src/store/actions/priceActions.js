export const priceActions = (set) => ({
  updatePrice: (sku, country, price) =>
    set((state) => ({
      prices: {
        ...state.prices,
        [sku]: {
          ...state.prices[sku],
          [country]: price
        }
      }
    })),
});