<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Notification from '@/components/Modal/Notification.vue';

interface FormData {
  username: string;
  password: string;
}

const form = ref<FormData>({ username: '', password: '' });
const timeoutId = ref<number | null>(null);
const showNotification = ref<boolean>(false);
const notificationMessage = ref<string>('');
const notificationType = ref<'success' | 'error'>('success');
const displayNotification = (message: string, type: 'success' | 'error' = 'success') => {
  notificationMessage.value = message;
  notificationType.value = type;
  showNotification.value = true;

  if (timeoutId.value) clearTimeout(timeoutId.value);

  timeoutId.value = window.setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

const errors = ref<Record<string, string>>({});

const validateForm = (): boolean => {
  let isValid = true;

  // Reset errors
  errors.value = {};

  if (form.value.username === '') {
    errors.value.username = 'Username tidak boleh kosong.';
    isValid = false;
  }

  if (form.value.password === '') {
    errors.value.password = 'Password tidak boleh kosong.';
    isValid = false;
  }

  return isValid;
};

const LoginProcess = async () => {
  if (!validateForm()) {
    const message = Object.values(errors.value).join('\n');
    displayNotification(message, 'error');
    return;
  }

  try {
    const baseUrl = window.location.protocol + '//' + window.location.hostname + ':3003';
    const response = await axios.post(baseUrl + '/auth/login_administrator', {
      username: form.value.username,
      password: form.value.password,
    });
    // filter
    if (response.status === 200) {
      localStorage.setItem('administrator_access_token', response.data.access_token);
      localStorage.setItem('administrator_refresh_token', response.data.refresh_token);
      displayNotification(response.data.message, 'success');
      setTimeout(() => {
        window.location.href = '/administrator-area';
      }, 1200);
    } else {
      displayNotification(error.response.data.message, 'error');
    }
  } catch (error) {
    displayNotification(error.response.data.message, 'error');
  }
};

onMounted(() => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
});
</script>
<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex p-3 bg-gray-900 items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white rounded"
      >
        <img
          class="w-full h-8 mr-2"
          src="https://www.hashmicro.com/assets/logo/logo-hashmicro-white.webp"
          alt="logo"
        />
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              This area is only for technical testing at HashMicro
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
  <Notification
    :showNotification="showNotification"
    :notificationType="notificationType"
    :notificationMessage="notificationMessage"
    @close="showNotification = false"
  ></Notification>
</template>
