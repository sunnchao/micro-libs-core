<script setup lang="ts">
  import { ref } from 'vue';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  const sideRef = ref();

  const { getCollapsed, getMenuWidth, getSplit, getMenuTheme, getRealWidth, getMenuHidden, getMenuFixed, getIsMixMode, toggleCollapsed } = useMenuSetting();
</script>
<template>
  <div>
    <a-layout-sider collapsible :width="getMenuWidth" ref="sideRef"> Sider1 </a-layout-sider>
  </div>
</template>

<style scoped></style>
