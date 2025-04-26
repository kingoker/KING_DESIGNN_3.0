<template>
    <div class="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 class="text-4xl font-bold">Ошибка {{ error.statusCode }}</h1>
        <p class="mt-4 text-gray-400">{{ error.message }}</p>
    </div>
    </template>

    <script setup>
    defineProps(['error'])
</script>