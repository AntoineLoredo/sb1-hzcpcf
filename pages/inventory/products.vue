```vue
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <SearchInput
          v-model="search"
          placeholder="Search products..."
          class="w-96"
        />
        <SupplierFilter
          :products="products"
          v-model="selectedSupplier"
        />
      </div>
      <div class="flex items-center space-x-3">
        <Button variant="secondary" :icon="FileDown" @click="handleDownloadTemplate">
          Download Template
        </Button>
        <Button variant="secondary" :icon="Upload" @click="handleImportClick">
          Import
        </Button>
        <Button variant="secondary" :icon="Download" @click="handleExport">
          Export
        </Button>
        <Button :icon="Plus" @click="handleAdd">
          Add Product
        </Button>
      </div>
    </div>

    <ProductForm
      v-if="showForm"
      :initial-data="selectedProduct?.variants.find(v => v.isPrimary)"
      @submit="handleSubmit"
      @cancel="closeForm"
    />

    <ProductDetail
      v-else-if="showDetail && selectedProduct"
      :product="selectedProduct"
      @close="closeDetail"
      @update="handleUpdate"
    />

    <ProductList
      v-else
      :products="filteredProducts"
      @edit="handleEdit"
      @view="handleView"
    />

    <input
      type="file"
      ref="fileInputRef"
      @change="handleFileChange"
      accept=".csv"
      class="hidden"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Plus, Download, Upload, FileDown } from 'lucide-vue-next';
import { useMainStore } from '~/stores/mainStore';
import { 
  generateTemplateCSV,
  exportProductsToCSV,
  parseProductsCSV,
  downloadCSV
} from '~/utils/productImportExport';

const store = useMainStore();
const fileInputRef = ref(null);

const search = ref('');
const selectedSupplier = ref('');
const selectedProduct = ref(null);
const showForm = ref(false);
const showDetail = ref(false);

const products = computed(() => store.products);

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(search.value.toLowerCase()) ||
      product.variants.some(v => 
        v.sku.toLowerCase().includes(search.value.toLowerCase()) ||
        v.name.toLowerCase().includes(search.value.toLowerCase())
      );

    const matchesSupplier = !selectedSupplier.value || 
      product.variants.some(v => v.supplier === selectedSupplier.value);

    return matchesSearch && matchesSupplier;
  });
});

const handleAdd = () => {
  selectedProduct.value = null;
  showForm.value = true;
  showDetail.value = false;
};

const handleEdit = (product) => {
  selectedProduct.value = product;
  showForm.value = true;
  showDetail.value = false;
};

const handleView = (product) => {
  selectedProduct.value = product;
  showDetail.value = true;
  showForm.value = false;
};

const handleSubmit = (data) => {
  if (selectedProduct.value) {
    store.updateProduct({
      ...selectedProduct.value,
      variants: selectedProduct.value.variants.map(v =>
        v.isPrimary ? { ...v, ...data } : v
      ),
    });
  }
  closeForm();
};

const handleUpdate = (product) => {
  store.updateProduct(product);
};

const closeForm = () => {
  showForm.value = false;
  selectedProduct.value = null;
};

const closeDetail = () => {
  showDetail.value = false;
  selectedProduct.value = null;
};

const handleImportClick = () => {
  fileInputRef.value?.click();
};

const handleFileChange = async (event) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      const importedProducts = await parseProductsCSV(file);
      importedProducts.forEach(product => {
        store.addProduct(product);
      });
    } catch (error) {
      console.error('Error importing products:', error);
    }
    event.target.value = '';
  }
};

const handleExport = () => {
  const csv = exportProductsToCSV(products.value);
  downloadCSV(csv, 'products_export.csv');
};

const handleDownloadTemplate = () => {
  const template = generateTemplateCSV();
  downloadCSV(template, 'products_template.csv');
};
</script>
```