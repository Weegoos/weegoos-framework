<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin">
      <WCard 
        preset="neon" 
        width="400px" 
        class="login-card"
        :glow="true"
      >
        <template #header>
          <h2 style="margin: 0; color: #fff;">Welcome Back</h2>
          <p style="color: #888; font-size: 0.9rem;">Sign in to continue to Weegoos</p>
        </template>

        <div class="form-fields">
          <!-- Email -->
          <WInput 
            v-model="email" 
            type="email" 
            placeholder="email@example.com" 
          />

          <!-- Пароль -->
          <WInput 
            v-model="password" 
            type="password" 
            placeholder="Enter your password" 
            autocomplete="current-password"
          />

          <!-- Числа -->
          <WInput 
            v-model="age" 
            type="number" 
            placeholder="Your age" 
          />

          <!-- ЗАМЕНА: Твой премиальный WDatePicker -->
          <WDatePicker 
            v-model="birthDate" 
            format="dd.MM.yyyy" 
            placeholder="Date of Birth"
          />
        </div>
<WBadge>Обычный тег</WBadge>
    <WBadge variant="success">Активный статус</WBadge>
    <WBadge variant="danger">Premium функция</WBadge>
    <WBadge variant="info">Фоновый элемент</WBadge>
      </WCard>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const birthDate = ref('');
const age = ref<number | null>(null);
const handleLogin = () => {
  console.log('Logging in with:', email.value, password.value, birthDate.value, age.value);
};

const myDate = ref('2026-07-06');
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #050505;
}

.form-fields {
display: flex;
  flex-direction: column;
  gap: 20px; 
  margin: 30px 0;
}

.footer-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.forgot-link {
  color: #666;
  font-size: 0.85rem;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-link:hover {
  color: #fff;
}
</style>