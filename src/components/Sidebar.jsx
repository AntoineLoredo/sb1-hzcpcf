import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const navigation = [
  {
    name: 'DASHBOARD',
    to: '/',
    icon: 'LayoutDashboard',
  },
  {
    name: 'SALES',
    children: [
      { name: 'Ventes', to: '/sales' },
      { name: 'SKU Historic', to: '/sku-historic' },
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

function NavItemContent({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
        >
          <span>{item.name}</span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isOpen && (
          <div className="ml-4 space-y-1">
            {item.children.map((child) => (
              <NavLink
                key={child.name}
                to={child.to || '#'}
                className={({ isActive }) =>
                  `block px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {child.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.to || '#'}
      className={({ isActive }) =>
        `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
          isActive
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      {item.icon === 'LayoutDashboard' && (
        <LayoutDashboard className="mr-3 h-5 w-5 flex-shrink-0" />
      )}
      {item.name}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-8">
        <div className="px-2 space-y-1">
          {navigation.map((item) => (
            <NavItemContent key={item.name} item={item} />
          ))}
        </div>
      </nav>
    </div>
  );
}