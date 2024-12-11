<template>
  <main>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink v-if="!userStore.isAuth" to="/register">Register</RouterLink>
      <RouterLink v-if="!userStore.isAuth" to="/login">Login</RouterLink>
      <button @click="userStore.logoutUser" v-if="userStore.isAuth">
        Logout
      </button>
    </nav>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  localStorage.getItem("token") && userStore.getUser();
});
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
