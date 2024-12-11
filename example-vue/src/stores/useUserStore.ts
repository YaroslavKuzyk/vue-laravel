import { defineStore } from "pinia";
import $api from "@/api";
import router from "@/router";

export const useUserStore = defineStore({
  id: "core-user-store",
  state: () => ({
    isAuth: false,
    userInfo: {},
  }),
  actions: {
    async registerUser(data: {
      name: string;
      email: string;
      password: string;
    }) {
      try {
        await $api.user.userRegister(data);
      } catch (error) {
        console.error(error);
      }
    },
    async loginUser(data: { email: string; password: string }) {
      try {
        await $api.user.userSanctum();
        const { data: response } = await $api.user.userlogin(data);
        localStorage.setItem("token", response.data.token);
        await this.getUser();
        if (this.isAuth) {
          router.push({ name: "dashboard" });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async logoutUser() {
      try {
        await $api.user.logoutUser();
        this.isAuth = false;
        localStorage.removeItem("token");
        router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    },
    async getUser() {
      try {
        const { data: response } = await $api.user.getUser();
        this.userInfo = response;
        this.isAuth = true;
      } catch (error) {
        this.isAuth = false;
        console.error(error);
      }
    },
  },
});
