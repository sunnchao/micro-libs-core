import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Layout',
  setup(props, { slots }) {
    return () => [1, slots.default && slots.default()];
  },
});
