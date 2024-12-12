import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SearchInput } from '../components/common/SearchInput';
import { BundleList } from '../components/bundles/BundleList';
import { BundleForm } from '../components/bundles/BundleForm';

export default function Bundles() {
  const { bundles } = useStore();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(null);

  const filteredBundles = bundles.filter(
    bundle =>
      bundle.name.toLowerCase().includes(search.toLowerCase()) ||
      bundle.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Bundles</h2>
        <div className="flex items-center space-x-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search bundles..."
            className="w-96"
          />
          <Button icon={Plus} onClick={() => {
            setSelectedBundle(null);
            setShowForm(true);
          }}>
            New Bundle
          </Button>
        </div>
      </div>

      {showForm ? (
        <BundleForm
          bundle={selectedBundle}
          onClose={() => {
            setShowForm(false);
            setSelectedBundle(null);
          }}
        />
      ) : (
        <BundleList
          bundles={filteredBundles}
          onEdit={bundle => {
            setSelectedBundle(bundle);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
}