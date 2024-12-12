```vue
<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Order
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Customer
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total amount
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Variant code / SKU
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Qty
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price brut
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Discount
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total price
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <template v-for="sale in sales" :key="sale.id">
          <tr v-for="(item, index) in sale.items" :key="item.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
            <template v-if="index === 0">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(sale.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ sale.orderNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ sale.customer }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(sale.totalAmount) }}
              </td>
            </template>
            <template v-else>
              <td class="px-6 py-4" colspan="4" />
            </template>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ item.sku }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ item.quantity }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatCurrency(item.grossPrice) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">
              {{ item.discount > 0 ? `-${formatCurrency(item.discount)}` : '-' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ formatCurrency(item.totalPrice) }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatCurrency } from '~/utils/formatters';

defineProps({
  sales: {
    type: Array,
    required: true
  }
});

const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy', { locale: fr });
};
</script>
```