export type NavigationItem = {
  name: string;
  to?: string;
  icon?: any;
  children?: NavigationItem[];
};

export const navigation: NavigationItem[] = [
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