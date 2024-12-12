import React from 'react';
import { ForecastData } from '../../types/forecast';
import { formatNumber } from '../../utils/formatters';

interface ForecastTableProps {
  data: ForecastData[];
}

export function ForecastTable({ data }: ForecastTableProps) {
  // Generate week numbers for the next 23 weeks
  const weekNumbers = Array.from({ length: 23 }, (_, i) => i + 1);

  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
              Variant code / SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Existing stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Average sales per week
            </th>
            {weekNumbers.map(week => (
              <th
                key={week}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                Stock end of week+{week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.sku} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                {item.sku}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatNumber(item.existingStock)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatNumber(item.averageSalesPerWeek, 1)}
              </td>
              {item.weeklyForecast.map((forecast, index) => (
                <td
                  key={index}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    forecast < 0
                      ? 'text-red-600 font-medium'
                      : forecast < item.safetyStock
                      ? 'text-yellow-600'
                      : 'text-gray-500'
                  }`}
                >
                  {formatNumber(forecast)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}