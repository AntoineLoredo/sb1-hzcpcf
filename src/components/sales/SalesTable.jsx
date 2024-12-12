import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatCurrency } from '../../utils/formatters';

export function SalesTable({ sales }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Variant code / SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Qty
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price brut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Discount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total price
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale) => (
            <SaleRows key={sale.id} sale={sale} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SaleRows({ sale }) {
  return (
    <>
      {sale.items.map((item, index) => (
        <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
          {index === 0 ? (
            <>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(sale.date, 'dd/MM/yyyy', { locale: fr })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {sale.orderNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {sale.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatCurrency(sale.totalAmount)}
              </td>
            </>
          ) : (
            <td className="px-6 py-4" colSpan={4} />
          )}
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.sku}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.quantity}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {formatCurrency(item.grossPrice)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
            {item.discount > 0 ? `-${formatCurrency(item.discount)}` : '-'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {formatCurrency(item.totalPrice)}
          </td>
        </tr>
      ))}
    </>
  );
}