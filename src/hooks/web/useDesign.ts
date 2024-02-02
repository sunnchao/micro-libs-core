import { useAppProviderContext } from '/@/components/Application';
import pkg from '../../../package.json';
// import { computed } from 'vue';
// import { lowerFirst } from 'lodash-es';
export function useDesign(scope: string = 'blk') {
  const values = useAppProviderContext();
  // const $style = cssModule ? useCssModule() : {};

  // const style: Record<string, string> = {};
  // if (cssModule) {
  //   Object.keys($style).forEach((key) => {
  //     // const moduleCls = $style[key];
  //     const k = key.replace(new RegExp(`^${values.prefixCls}-?`, 'ig'), '');
  //     style[lowerFirst(k)] = $style[key];
  //   });
  // }
  return {
    // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
    prefixCls: `${values.prefixCls ?? '' + pkg.version}-${scope}`,
    prefixVar: values.prefixCls,
    // style,
  };
}
