export * from 'vue-router';
import { createRouter as _createRouter, createWebHashHistory, RouterOptions } from 'vue-router';
import type { Router } from 'vue-router';

export const getRouter = (options: RouterOptions): Router => {
  const {
    history = createWebHashHistory(),
    routes,
    strict = true,
    scrollBehavior = () => {
      return { top: 0 };
    },
  } = options;

  return _createRouter({
    history,
    routes,
    strict,
    scrollBehavior,
  });
};

export { useBeforeEach } from './beforeEach/index.js';
export { useAfterEach } from './afterEach/index.js';
