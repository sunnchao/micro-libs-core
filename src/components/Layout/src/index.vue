<template>
  <Layout :class="['default-layout', prefixCls]">
    <LayoutSider />
    <Layout>
      <LayoutHeader />
      <LayoutContent />
    </Layout>
  </Layout>
</template>

<script setup lang="ts">

  import { Layout } from 'ant-design-vue';
  import LayoutContent from './Content/index.vue';
  import LayoutSider from './Sider/index.vue';

  import LayoutHeader from './Header/index.vue';

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
    background-color: #ffffff;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>
