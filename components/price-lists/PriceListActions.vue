```vue
<template>
  <div class="flex items-center space-x-3">
    <input
      type="file"
      ref="fileInputRef"
      @change="handleFileChange"
      accept=".csv"
      class="hidden"
    />
    <Button variant="secondary" :icon="FileDown" @click="$emit('download-template')">
      Download Template
    </Button>
    <Button variant="secondary" :icon="Upload" @click="handleImportClick">
      Import
    </Button>
    <Button variant="secondary" :icon="Download" @click="$emit('export')">
      Export
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Download, Upload, FileDown } from 'lucide-vue-next';

const emit = defineEmits(['import', 'export', 'download-template']);
const fileInputRef = ref(null);

const handleImportClick = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    emit('import', file);
    // Reset input
    event.target.value = '';
  }
};
</script>
```