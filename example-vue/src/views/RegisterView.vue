<template>
  <div class="form">
    <input v-model="credentials.name" type="text" :placeholder="'Name'" />
    <input v-model="credentials.email" type="email" :placeholder="'E-mail'" />
    <input
      v-model="credentials.password"
      type="password"
      :placeholder="'Password'"
    />
    <input
      v-model="credentials.password_confirmation"
      type="password"
      :placeholder="'Password Confirmation'"
    />
    <button @click="sendForm">Sign Up</button>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/useUserStore";
import { ref } from "vue";

const userStore = useUserStore();

const credentials = ref({
  email: "kuzyk.yarik@gmail.com",
  name: "Yaroslav",
  password: "password",
  password_confirmation: "password",
});

const sendForm = async () => {
  userStore.registerUser(credentials.value);
};
</script>

<style lang="scss" scoped></style>
