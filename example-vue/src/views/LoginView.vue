<template>
  <div class="form">
    <input v-model="credentials.email" type="email" :placeholder="'E-mail'" />
    <input
      v-model="credentials.password"
      type="password"
      :placeholder="'Password'"
    />
    <button @click="sendForm">Login</button>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/useUserStore";
import { ref } from "vue";

const userStore = useUserStore();

const credentials = ref({
  email: "kuzyk.yarik@gmail.com",
  password: "password",
});

const sendForm = async () => {
  userStore.loginUser(credentials.value);
};
</script>

<style lang="scss" scoped></style>
