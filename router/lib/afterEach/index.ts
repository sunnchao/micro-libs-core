import type { Router } from 'vue-router';

/**
 * @description: router afterEach
 * @param router
 */
export const useAfterEach = (router: Router) => {
  router.afterEach((to, from) => {});
};
