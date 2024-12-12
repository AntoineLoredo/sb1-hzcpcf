import React from 'react';
import { Download, Upload, Plus, FileDown } from 'lucide-react';
import { Button } from '../common/Button';

interface ProductActionsProps {
  onAdd: () => void;
  onImport: (file: File) => void;
  onExport: () => void;
  onDownloadTemplate: () => void;
}

export function ProductActions({ onAdd, onImport, onExport, onDownloadTemplate }: ProductActionsProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
      // Reset input
      event.target.value = '';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
      <Button variant="secondary" icon={FileDown} onClick={onDownloadTemplate}>
        Download Template
      </Button>
      <Button variant="secondary" icon={Upload} onClick={handleImportClick}>
        Import
      </Button>
      <Button variant="secondary" icon={Download} onClick={onExport}>
        Export
      </Button>
      <Button icon={Plus} onClick={onAdd}>
        Add Product
      </Button>
    </div>
  );
}