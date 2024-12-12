import React, { useState } from 'react';
import { Product, ProductVariant } from '../../types/product';
import { Button } from '../common/Button';
import { X, Edit2, Check, XCircle } from 'lucide-react';
import { VariantBasicInfo } from './variant-details/VariantBasicInfo';
import { VariantStockInfo } from './variant-details/VariantStockInfo';
import { VariantPricingInfo } from './variant-details/VariantPricingInfo';
import { VariantSupplierInfo } from './variant-details/VariantSupplierInfo';
import { VariantQualityInfo } from './variant-details/VariantQualityInfo';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onUpdate: (product: Product) => void;
}

export function ProductDetail({ product, onClose, onUpdate }: ProductDetailProps) {
  const [editingVariant, setEditingVariant] = useState<string | null>(null);
  const [editedVariant, setEditedVariant] = useState<ProductVariant | null>(null);

  const handleEdit = (variant: ProductVariant) => {
    setEditingVariant(variant.id);
    setEditedVariant({ ...variant });
  };

  const handleSave = () => {
    if (!editedVariant) return;

    const updatedProduct = {
      ...product,
      variants: product.variants.map(v =>
        v.id === editingVariant ? editedVariant : v
      ),
    };

    onUpdate(updatedProduct);
    setEditingVariant(null);
    setEditedVariant(null);
  };

  const handleCancel = () => {
    setEditingVariant(null);
    setEditedVariant(null);
  };

  const handleFieldEdit = (variant: ProductVariant, field: keyof ProductVariant, value: any) => {
    setEditedVariant({ ...variant, [field]: value });
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
        <div className="flex space-x-4">
          {editingVariant ? (
            <>
              <Button variant="primary" icon={Check} onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="secondary" icon={XCircle} onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="secondary" icon={X} onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      <div className="p-6">
        {product.variants.map((variant) => (
          <div key={variant.id} className="mb-8 last:mb-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {variant.name}
                {variant.isPrimary && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                    Primary
                  </span>
                )}
              </h3>
              {!editingVariant && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Edit2}
                  onClick={() => handleEdit(variant)}
                >
                  Edit
                </Button>
              )}
            </div>

            <div className="space-y-6">
              <VariantBasicInfo
                variant={variant}
                isEditing={editingVariant === variant.id}
                editedVariant={editedVariant}
                onEdit={(field, value) => handleFieldEdit(variant, field, value)}
              />

              <VariantStockInfo
                variant={variant}
                isEditing={editingVariant === variant.id}
                editedVariant={editedVariant}
                onEdit={(field, value) => handleFieldEdit(variant, field, value)}
              />

              <VariantPricingInfo
                variant={variant}
                isEditing={editingVariant === variant.id}
                editedVariant={editedVariant}
                onEdit={(field, value) => handleFieldEdit(variant, field, value)}
              />

              <VariantSupplierInfo
                variant={variant}
                isEditing={editingVariant === variant.id}
                editedVariant={editedVariant}
                onEdit={(field, value) => handleFieldEdit(variant, field, value)}
              />

              <VariantQualityInfo
                variant={variant}
                isEditing={editingVariant === variant.id}
                editedVariant={editedVariant}
                onEdit={(field, value) => handleFieldEdit(variant, field, value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}