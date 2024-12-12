export const bundleActions = (set) => ({
  addBundle: (bundle) =>
    set((state) => ({
      bundles: [...state.bundles, bundle]
    })),

  updateBundle: (bundle) =>
    set((state) => ({
      bundles: state.bundles.map(b =>
        b.id === bundle.id ? bundle : b
      )
    })),

  deleteBundle: (bundleId) =>
    set((state) => ({
      bundles: state.bundles.filter(b => b.id !== bundleId)
    })),
});