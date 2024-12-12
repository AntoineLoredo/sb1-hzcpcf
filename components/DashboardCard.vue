<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <p
          class="mt-2 text-3xl font-semibold"
          :class="alert ? 'text-red-600' : 'text-gray-900'"
        >
          {{ value }}
        </p>
      </div>
      <div
        class="p-3 rounded-full"
        :class="alert ? 'bg-red-100' : 'bg-gray-100'"
      >
        <component
          :is="icon"
          class="h-6 w-6"
          :class="alert ? 'text-red-600' : 'text-gray-600'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  alert: {
    type: Boolean,
    default: false
  }
});
</script>