import { defineStore } from 'pinia';

/**
 * @description User store
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    access_token: 'root user',
  }),
  getters: {
    getAccessToken(state) {
      return state.access_token;
    },
  },
  actions: {
    setAccessToken({ state }, payload) {
      state.access_token = payload;
    },
  },
});
