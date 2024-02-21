import type { Router } from 'vue-router';

/**
 * @description: router addRoute
 * @param router
 */
export const useBeforeEach = (router: Router) => {
  router.beforeEach((to, from, next) => {
    // 校验登录Token
    const token = getToken();
    if (!token) {
      if (to.path === '/login') {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    } else {
      next();
    }
  });
};

const getToken = () => {
  return sessionStorage.getItem('token') ?? undefined;
};
