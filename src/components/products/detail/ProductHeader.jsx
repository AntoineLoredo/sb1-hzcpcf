import React from 'react';

export function ProductHeader({ product }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
      </div>
      <div>
        {product.variants[0]?.imageUrl && (
          <img
            src={product.variants[0].imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
}