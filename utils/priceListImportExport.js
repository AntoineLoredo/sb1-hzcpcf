```js
const TEMPLATE_HEADERS = [
  'SKU',
  'Product Name',
  'Base Price',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'UK'
];

export function generatePriceListTemplate() {
  return TEMPLATE_HEADERS.join(',') + '\n';
}

export function exportPriceList(products, prices) {
  const rows = [TEMPLATE_HEADERS];

  products.forEach(product => {
    product.variants.forEach(variant => {
      const row = [
        variant.sku,
        variant.name,
        variant.purchasePrice,
        ...TEMPLATE_HEADERS.slice(3).map(country => 
          prices[variant.sku]?.[country] || variant.purchasePrice * 1.5
        )
      ];
      rows.push(row);
    });
  });

  return rows.map(row => row.join(',')).join('\n');
}

export async function parsePriceListCSV(file) {
  const text = await file.text();
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  const prices = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');
    const sku = values[0];
    
    if (!prices[sku]) {
      prices[sku] = {};
    }

    headers.slice(3).forEach((country, index) => {
      prices[sku][country] = parseFloat(values[index + 3]) || 0;
    });
  }

  return prices;
}

export function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
```