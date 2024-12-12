import React from 'react';

interface ProductStatusProps {
  status: string;
}

export function ProductStatus({ status }: ProductStatusProps) {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
        status
      )}`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'in_stock':
      return 'bg-green-100 text-green-800';
    case 'low_stock':
      return 'bg-yellow-100 text-yellow-800';
    case 'out_of_stock':
      return 'bg-red-100 text-red-800';
    case 'reorder_in_progress':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}