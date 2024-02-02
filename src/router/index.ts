import { createRouter as _createRouter, createWebHashHistory } from 'vue-router';
import type { Router, RouterOptions } from 'vue-router';

let router: Router;
const WHITE_NAME_LIST = [];
export const getRouter = (options: RouterOptions, whiteList?: []): Router => {
  const {
    history = createWebHashHistory(),
    routes,
    strict = true,
    scrollBehavior = () => {
      return { top: 0 };
    },
  } = options;

  whiteList?.length && WHITE_NAME_LIST.slice(0).push(...whiteList);

  return (router = _createRouter({
    history,
    routes,
    strict,
    scrollBehavior,
  }));
};

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export { useBeforeEach } from './beforeEach/index.js';
export { useAfterEach } from './afterEach/index.js';
export * from 'vue-router';
