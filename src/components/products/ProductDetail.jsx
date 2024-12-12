import React from 'react';
import { Button } from '../common/Button';
import { X } from 'lucide-react';
import { ProductHeader } from './detail/ProductHeader';
import { ProductVariantsTable } from './detail/ProductVariantsTable';

export function ProductDetail({ product, onClose }) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-900">Product Details</h2>
        <Button variant="secondary" icon={X} onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="p-6 space-y-8">
        <ProductHeader product={product} />
        <ProductVariantsTable variants={product.variants} />
      </div>
    </div>
  );
}