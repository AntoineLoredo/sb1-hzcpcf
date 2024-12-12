export const navigation = [
  {
    name: 'DASHBOARD',
    to: '/',
    icon: 'LayoutDashboard',
  },
  {
    name: 'SALES',
    children: [
      { name: 'Ventes', to: '/sales' },
      { name: 'Price Lists', to: '/price-lists' },
    ],
  },
  {
    name: 'INVENTORY',
    children: [
      { name: 'Products', to: '/inventory/products' },
      { name: 'Bundles', to: '/inventory/bundles' },
      { name: 'Price Lists', to: '/inventory/price-lists' },
    ],
  },
  {
    name: 'STOCK CONTROL',
    children: [
      { name: 'Purchases', to: '/stock/purchases' },
      { name: 'Adjustments', to: '/stock/adjustments' },
      { name: 'Transfers', to: '/stock/transfers' },
    ],
  },
  {
    name: 'FORECAST',
    children: [
      { name: 'Stock Forecast', to: '/forecast' },
      { name: 'Replenishment', to: '/forecast/replenishment' },
    ],
  },
  {
    name: 'MANUFACTURING',
    to: '/manufacturing',
  },
  {
    name: 'REPORT',
    to: '/report',
  },
  {
    name: 'CONTACTS',
    to: '/contacts',
  },
];