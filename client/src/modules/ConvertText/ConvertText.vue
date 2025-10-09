<script setup lang="ts">
import { ref } from 'vue';

const input1 = ref('');
const input2 = ref('');
const isSensitive = ref('true');
const result = ref<number | null>(null);

const checkSimilarity = () => {
  let str1 = input1.value;
  let str2 = input2.value;

  if (isSensitive.value === 'false') {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
  }

  if (!str1.length) {
    result.value = 0;
    return;
  }

  let matchCount = 0;
  for (const char of str1) {
    if (str2.includes(char)) matchCount++;
  }

  result.value = parseFloat(((matchCount / str1.length) * 100).toFixed(2));
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 min-h-screen py-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 max-w-6xl mx-auto items-start">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Form Input</h2>
        <form class="space-y-6" @submit.prevent="checkSimilarity">
          <div>
            <label for="kata1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Kata Pertama
            </label>
            <input
              v-model="input1"
              type="text"
              id="kata1"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Masukkan kata pertama"
            />
          </div>

          <div>
            <label for="kata2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Kata Kedua
            </label>
            <input
              v-model="input2"
              type="text"
              id="kata2"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Masukkan kata kedua"
            />
          </div>

          <div>
            <label for="jenis" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Jenis
            </label>
            <select
              v-model="isSensitive"
              id="daftarBank"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="true">Sensitive Case</option>
              <option value="false">Non-Sensitive Case</option>
            </select>
          </div>

          <button
            type="submit"
            class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Hitung
          </button>

          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Menghitung persentasi kemunculan karakter
          </p>
        </form>
      </div>
      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Hasil</h2>
        <p class="text-gray-700 dark:text-gray-300 text-sm">
          Jumlah Persentasi kemunculan karakter dari input pertama ada di input kedua adalah
          <span class="font-bold">{{ result?.toString() }} %</span>
        </p>
      </div>
    </div>
  </section>
</template>
