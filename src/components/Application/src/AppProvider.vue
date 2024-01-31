<script setup lang="ts" name="AppProvider">
export interface Props {
  appName: string,
}

withDefaults(defineProps<Props>(), {
  appName: 'default'
})
</script>

<template>
  <h1>
    {{ appName }}
  </h1>
  <slot></slot>
</template>

<style lang="less" scoped>
h1 {
  color: red;
}
</style>
