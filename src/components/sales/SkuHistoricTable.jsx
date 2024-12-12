import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Edit2, Check, X } from 'lucide-react';
import { Button } from '../common/Button';

export function SkuHistoricTable({ products }) {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState(null);

  // Group variants by their base SKU
  const groupedVariants = products.reduce((acc, product) => {
    product.variants.forEach(variant => {
      const baseSku = variant.sku.split('-v')[0];
      if (!acc[baseSku]) {
        acc[baseSku] = {
          id: product.id,
          productName: product.name,
          variants: []
        };
      }
      acc[baseSku].variants.push(variant);
    });
    return acc;
  }, {});

  const handleEdit = (baseSku) => {
    setEditingRow(baseSku);
    setEditedData(groupedVariants[baseSku]);
  };

  const handleSave = () => {
    // Here you would typically update the data through your state management
    console.log('Saving changes:', editedData);
    setEditingRow(null);
    setEditedData(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedData(null);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Variant Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Version 1 SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Version 2 SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Version 3 SKU
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(groupedVariants).map(([baseSku, { productName, variants }]) => {
            const sortedVariants = [...variants].sort((a, b) => a.version - b.version);
            const isEditing = editingRow === baseSku;
            
            return (
              <tr key={baseSku} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.productName}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        productName: e.target.value
                      })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    productName
                  )}
                </td>
                {[1, 2, 3].map(version => {
                  const variant = sortedVariants.find(v => v.version === version);
                  return (
                    <td key={version} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {isEditing ? (
                        <input
                          type="text"
                          value={variant?.sku || ''}
                          onChange={(e) => {
                            const updatedVariants = [...editedData.variants];
                            const variantIndex = updatedVariants.findIndex(v => v.version === version);
                            if (variantIndex >= 0) {
                              updatedVariants[variantIndex] = {
                                ...updatedVariants[variantIndex],
                                sku: e.target.value
                              };
                            }
                            setEditedData({
                              ...editedData,
                              variants: updatedVariants
                            });
                          }}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      ) : (
                        variant ? variant.sku : '-'
                      )}
                    </td>
                  );
                })}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isEditing ? (
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Check}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={X}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Edit2}
                      onClick={() => handleEdit(baseSku)}
                    >
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}