export function generateTemplateCSV() {
  const TEMPLATE_HEADERS = [
    'Product name',
    'Category',
    'EAN',
    'Product variant name',
    'Variant code / SKU',
    'Variant option 1',
    'Variant value 1',
    'Variant option 2',
    'Variant value 2',
    'Variant option 3',
    'Variant value 3',
    '# version',
    'Status',
    'Is Primary',
    'Supplier',
    'Weight',
    'Length',
    'Width',
    'Height',
    'Dimension unit',
    'MOQ',
    'Lead time (week)',
    'Safety stock (week)',
    'Purchase price',
    'Logistic cost',
    'Description',
    'Image URL'
  ];

  return TEMPLATE_HEADERS.join(',') + '\n';
}

export function exportProductsToCSV(products) {
  const rows = [TEMPLATE_HEADERS];

  products.forEach(product => {
    product.variants.forEach(variant => {
      rows.push([
        product.name,
        product.category,
        product.ean,
        variant.name,
        variant.sku,
        variant.option1Type,
        variant.option1Value,
        variant.option2Type || '',
        variant.option2Value || '',
        variant.option3Type || '',
        variant.option3Value || '',
        variant.version,
        variant.status,
        variant.isPrimary ? 'Yes' : 'No',
        variant.supplier,
        variant.weight,
        variant.dimensions.length,
        variant.dimensions.width,
        variant.dimensions.height,
        variant.dimensions.unit,
        variant.moq,
        variant.leadTimeWeeks,
        variant.safetyStockWeeks,
        variant.purchasePrice,
        variant.logisticCost,
        product.description,
        variant.imageUrl
      ]);
    });
  });

  return rows.map(row => row.join(',')).join('\n');
}

export async function parseProductsCSV(file) {
  const text = await file.text();
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  const products = new Map();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');
    const data = {};
    headers.forEach((header, index) => {
      data[header.trim()] = values[index]?.trim() || '';
    });

    const productName = data['Product name'];
    if (!products.has(productName)) {
      products.set(productName, {
        id: crypto.randomUUID(),
        name: productName,
        category: data['Category'],
        ean: data['EAN'],
        description: data['Description'],
        variants: []
      });
    }

    const product = products.get(productName);
    const variant = {
      id: crypto.randomUUID(),
      name: data['Product variant name'],
      sku: data['Variant code / SKU'],
      option1Type: data['Variant option 1'],
      option1Value: data['Variant value 1'],
      option2Type: data['Variant option 2'] || undefined,
      option2Value: data['Variant value 2'] || undefined,
      option3Type: data['Variant option 3'] || undefined,
      option3Value: data['Variant value 3'] || undefined,
      version: parseInt(data['# version']) || 1,
      status: data['Status'],
      isPrimary: data['Is Primary'].toLowerCase() === 'yes',
      supplier: data['Supplier'],
      weight: parseFloat(data['Weight']) || 0,
      dimensions: {
        length: parseFloat(data['Length']) || 0,
        width: parseFloat(data['Width']) || 0,
        height: parseFloat(data['Height']) || 0,
        unit: data['Dimension unit']
      },
      moq: parseInt(data['MOQ']) || 1,
      leadTimeWeeks: parseInt(data['Lead time (week)']) || 1,
      safetyStockWeeks: parseInt(data['Safety stock (week)']) || 2,
      purchasePrice: parseFloat(data['Purchase price']) || 0,
      logisticCost: parseFloat(data['Logistic cost']) || 0,
      imageUrl: data['Image URL']
    };

    product.variants.push(variant);
  }

  return Array.from(products.values());
}

export function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}