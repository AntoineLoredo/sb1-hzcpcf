<template>
  <div class="w-64 bg-white border-r border-gray-200 min-h-screen">
    <nav class="mt-8">
      <div class="px-2 space-y-1">
        <template v-for="item in navigation" :key="item.name">
          <div v-if="item.children">
            <button
              @click="toggleMenu(item.name)"
              class="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
            >
              <span>{{ item.name }}</span>
              <ChevronDown v-if="openMenus[item.name]" class="h-4 w-4" />
              <ChevronRight v-else class="h-4 w-4" />
            </button>
            <div v-if="openMenus[item.name]" class="ml-4 space-y-1">
              <NuxtLink
                v-for="child in item.children"
                :key="child.name"
                :to="child.to"
                class="block px-2 py-2 text-sm font-medium rounded-md"
                :class="[
                  $route.path === child.to
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                ]"
              >
                {{ child.name }}
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            v-else
            :to="item.to"
            class="flex items-center px-2 py-2 text-sm font-medium rounded-md"
            :class="[
              $route.path === itdata / mockDataem.to
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            ]"
          >
            <component
              v-if="item.icon"
              :is="item.icon"
              class="mr-3 h-5 w-5 flex-shrink-0"
            />
            {{ item.name }}
          </NuxtLink>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ChevronDown, ChevronRight, LayoutDashboard } from 'lucide-vue-next';

export default {
  name: 'AppSidebar',
  components: {
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
  },
  setup() {
    const openMenus = ref({});

    const navigation = [
      {
        name: 'DASHBOARD',
        to: '/',
        icon: LayoutDashboard,
      },
      {
        name: 'SALES',
        children: [
          { name: 'Ventes', to: '/sales' },
          { name: 'SKU Historic', to: '/sku-historic' },
          { name: 'Price Lists', to: '/price-lists' },
        ],
      },
      {
        name: 'INVENTORY',
        children: [
          { name: 'Products', to: '/inventory/products' },
          { name: 'Bundles', to: '/inventory/bundles' },
          { name: 'Price Lists', to: '/inventory/price-lists' },
        ],
      },
      {
        name: 'STOCK CONTROL',
        children: [
          { name: 'Purchases', to: '/stock/purchases' },
          { name: 'Adjustments', to: '/stock/adjustments' },
          { name: 'Transfers', to: '/stock/transfers' },
        ],
      },
      {
        name: 'FORECAST',
        children: [
          { name: 'Stock Forecast', to: '/forecast' },
          { name: 'Replenishment', to: '/forecast/replenishment' },
        ],
      },
      {
        name: 'REPORT',
        to: '/report',
      },
      {
        name: 'CONTACTS',
        to: '/contacts',
      },
    ];

    const toggleMenu = (menuName) => {
      openMenus.value[menuName] = !openMenus.value[menuName];
    };

    return {
      navigation,
      openMenus,
      toggleMenu,
    };
  },
};
</script>
