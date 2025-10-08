<script setup lang="ts">
import Content from './widgets/Content.vue';
import LoadOverlay from '@/components/Loading/LoadOverlay.vue';
</script>
<template>
  <LoadOverlay />
  <div class="min-h-screen flex flex-col bg-white">
    <Content />
  </div>
</template>
