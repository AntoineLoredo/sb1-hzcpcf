```vue
<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-md',
      variantStyles[variant],
      sizeStyles[size],
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      className
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <component
      v-if="icon"
      :is="icon"
      :class="[
        size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
        $slots.default ? 'mr-2' : ''
      ]"
    />
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value)
  },
  icon: {
    type: Object,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button'
  }
});

defineEmits(['click']);

const variantStyles = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  danger: 'bg-red-600 text-white hover:bg-red-700'
};

const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};
</script>
```