import React from 'react';
import { Download, Upload, FileDown } from 'lucide-react';
import { Button } from '../common/Button';

export function PriceListActions({ onImport, onExport, onDownloadTemplate }) {
  const fileInputRef = React.useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
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
    </div>
  );
}