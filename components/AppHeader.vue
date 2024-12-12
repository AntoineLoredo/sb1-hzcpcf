<template>
  <header class="bg-white border-b border-gray-200">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <h1 class="text-2xl font-semibold text-gray-900">
          Furniture Inventory Management
        </h1>
        <div class="flex items-center gap-4">
          <button class="p-2 text-gray-400 hover:text-gray-500">
            <Bell class="h-6 w-6" />
          </button>
          <button class="p-2 text-gray-400 hover:text-gray-500">
            <Settings class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { Bell, Settings } from 'lucide-vue-next';

export default {
  name: 'AppHeader',
  components: {
    Bell,
    Settings
  }
}
</script>