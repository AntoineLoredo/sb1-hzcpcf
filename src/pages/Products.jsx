import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ProductList } from '../components/products/ProductList';
import { SearchInput } from '../components/common/SearchInput';
import { ProductVariantForm } from '../components/products/ProductVariantForm';
import { ProductDetail } from '../components/products/ProductDetail';
import { ProductActions } from '../components/products/ProductActions';
import { SupplierFilter } from '../components/products/SupplierFilter';
import {
  generateTemplateCSV,
  exportProductsToCSV,
  parseProductsCSV,
  downloadCSV
} from '../utils/productImportExport';

export default function Products() {
  const { products, addProduct, updateProduct } = useStore();
  const [search, setSearch] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.variants.some(v => 
          v.sku.toLowerCase().includes(search.toLowerCase()) ||
          v.name.toLowerCase().includes(search.toLowerCase())
        );

      const matchesSupplier = !selectedSupplier || 
        product.variants.some(v => v.supplier === selectedSupplier);

      return matchesSearch && matchesSupplier;
    }
  );

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
    setShowForm(false);
  };

  const handleImport = async (file) => {
    try {
      const importedProducts = await parseProductsCSV(file);
      importedProducts.forEach(product => {
        addProduct(product);
      });
    } catch (error) {
      console.error('Error importing products:', error);
    }
  };

  const handleExport = () => {
    const csv = exportProductsToCSV(products);
    downloadCSV(csv, 'products_export.csv');
  };

  const handleDownloadTemplate = () => {
    const template = generateTemplateCSV();
    downloadCSV(template, 'products_template.csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search products..."
            className="w-96"
          />
          <SupplierFilter
            products={products}
            selectedSupplier={selectedSupplier}
            onSupplierChange={setSelectedSupplier}
          />
        </div>
        <ProductActions
          onAdd={() => {
            setSelectedProduct(null);
            setShowForm(true);
            setShowDetail(false);
          }}
          onImport={handleImport}
          onExport={handleExport}
          onDownloadTemplate={handleDownloadTemplate}
        />
      </div>

      {showForm ? (
        <ProductVariantForm
          initialData={selectedProduct?.variants.find(v => v.isPrimary)}
          onSubmit={(data) => {
            if (selectedProduct) {
              updateProduct({
                ...selectedProduct,
                variants: selectedProduct.variants.map(v =>
                  v.isPrimary ? { ...v, ...data } : v
                ),
              });
            }
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : showDetail && selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onClose={() => {
            setShowDetail(false);
            setSelectedProduct(null);
          }}
        />
      ) : (
        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}
    </div>
  );
}