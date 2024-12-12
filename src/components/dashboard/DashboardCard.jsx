import React from 'react';

export function DashboardCard({ title, value, icon: Icon, alert = false }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p
            className={`mt-2 text-3xl font-semibold ${
              alert ? 'text-red-600' : 'text-gray-900'
            }`}
          >
            {value}
          </p>
        </div>
        <div
          className={`p-3 rounded-full ${
            alert ? 'bg-red-100' : 'bg-gray-100'
          }`}
        >
          <Icon
            className={`h-6 w-6 ${alert ? 'text-red-600' : 'text-gray-600'}`}
          />
        </div>
      </div>
    </div>
  );
}