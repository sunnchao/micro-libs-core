<template>
  <a-layout :class="['default-layout', prefixCls]">
    <LayoutSider />
    <a-layout>
      <LayoutHeader />
      <a-layout :class="`${prefixCls}-main`">
        <LayoutContent />
        <LayoutFooter />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import LayoutContent from './Content/index.vue';
  import LayoutHeader from './Header/index.vue';
  import LayoutSider from './Sider/index.vue';
  import LayoutFooter from './Footer/index.vue';

  import { useDesign } from '@/hooks/web/useDesign';
  const { prefixCls } = useDesign();

  defineOptions({
    name: 'Layout',
  });
</script>

<style scoped lang="less">
  .default-layout {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: #f3f3f3;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
      width: 100%;
    }

    &-main {
      width: 100%;
      background-color: #333;
    }
  }
</style>
