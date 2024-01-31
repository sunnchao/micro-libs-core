// import type { VNode, VNodeChild, PropType as VuePropType } from 'vue';
//
// declare global {
//   // vue
//   type PropType<T> = VuePropType<T>;
//   type VueNode = VNodeChild | JSX.Element;
//
//   namespace JSX {
//     // tslint:disable no-empty-interface
//     type Element = VNode;
//     // tslint:disable no-empty-interface
//     // type ElementClass = ComponentRenderProxy;
//     interface ElementAttributesProperty {
//       $props: any;
//     }
//     interface IntrinsicElements {
//       [elem: string]: any;
//     }
//     interface IntrinsicAttributes {
//       [elem: string]: any;
//     }
//   }
// }
//
// declare module 'vue' {
//   export type JSXComponent<Props = any> =
//     | { new (): ComponentPublicInstance<Props> }
//     | FunctionalComponent<Props>;
// }
