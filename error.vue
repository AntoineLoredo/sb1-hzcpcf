<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">
        {{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}
      </h1>
      <p class="text-gray-600 mb-6">
        {{ error.message }}
      </p>
      <Button @click="handleError">Return to Home</Button>
    </div>
  </div>
</template>

<script setup>
const error = useError();

const handleError = () => {
  clearError({ redirect: '/' });
};
</script>