<script setup lang="ts">
  import { ref } from 'vue';
  const sideRef = ref();
</script>
<template>
  <a-layout-sider collapsible :width="getMenuWidth" ref="sideRef"> Sider1 </a-layout-sider>
</template>

<style scoped></style>
