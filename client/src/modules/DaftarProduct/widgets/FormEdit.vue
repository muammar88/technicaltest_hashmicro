<script setup lang="ts">
// Library
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import Notification from '@/components/Modal/Notification.vue';
import BaseButton from '@/components/Button/BaseButton.vue';
import InputText from '@/components/Form/InputText.vue';
import LoadingSpinner from '@/components/Loading/LoadingSpinner.vue';

// Composable
import { useNotification } from '@/composables/useNotification';

// Service
import { update_product, get_info_edit } from '@/service/product';

// Composable: notification
const { showNotification, notificationType, notificationMessage, displayNotification } =
  useNotification();

interface Props {
  isModalOpen: boolean;
  selectedProduk: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'status', payload: { error_msg?: string; error?: boolean }): void;
}>();

// Function: Close modal
const closeModal = () => {
  if (isSubmitting.value) return;
  resetForm();
  emit('close');
};

// Function: Reset form
const resetForm = () => {
  form.value.name = '';
  form.value.desc = '';

  errors.value = {};
};

// Function: Validate form
const errors = ref<Record<string, string>>({
  name: '',
  img: '',
});

const validateForm = () => {
  let isValid = true;

  // Reset errors
  errors.value = {};

  if (form.value.name === '') {
    errors.value.name = 'Nama bank tidak boleh kosong.';
    isValid = false;
  }

  if (form.value.desc === '') {
    errors.value.desc = 'Deskripsi produk tidak boleh kosong.';
    isValid = false;
  }

  console.log(errors.value);

  return isValid;
};

// State: Loading
const isLoading = ref(true);
const form = ref<{ name: string; desc: string }>({
  name: '',
  desc: '',
});

// Function: Fetch Data
const fetchData = async () => {
  console.log('isLoading----');
  console.log(isLoading);
  console.log(props.selectedProduk);
  console.log('isLoading----');
  // if (!props.selectedProduk) return;
  try {
    const response = await get_info_edit(props.selectedProduk);
    form.value.name = response.data.name;
    form.value.desc = response.data.description;

    console.log('__________________response');
    console.log(response);
    console.log(form.value);
    console.log('__________________response');
  } catch (error) {
    displayNotification('Gagal', 'error');
  } finally {
    isLoading.value = false;
  }
};

// Function: Handle submit
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const response = await update_product({
      id: props.selectedProduk,
      name: form.value.name,
      desc: form.value.desc,
    });
    console.log(response);
    emit('status', { error_msg: response.messsage, error: response.error });
    closeModal();
  } catch (error: any) {
    console.error(error);
    displayNotification(error.response.data.error_msg || error.response.data.message, 'error');
  } finally {
    isSubmitting.value = false;
    closeModal();
  }
};

// Function: Handle escape & Fetch Data
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isModalOpen) closeModal();
};
onMounted(async () => {
  if (props.selectedProduk && props.selectedProduk !== 0) {
    await fetchData();
  }
  document.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(async () => {
  await fetchData();
  document.removeEventListener('keydown', handleEscape);
});

watch(
  () => props.selectedProduk,
  (val) => {
    if (props.selectedProduk != 0) {
      console.log('---DDDDSAA');
      console.log(props.selectedProduk);
      console.log('---DDDDSAA');
      fetchData();
    }
  },
  { immediate: true },
);
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <LoadingSpinner v-if="isLoading" label="Memuat halaman..." />
      <div v-else class="relative max-w-md w-full bg-white shadow-2xl rounded-2xl p-6 space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h2 id="modal-title" class="text-xl font-bold text-gray-800">Edit Produk</h2>
          <button
            class="text-gray-400 text-lg hover:text-gray-600"
            @click="closeModal"
            aria-label="Tutup modal"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>

        <!-- Nama Produk -->
        <div>
          <InputText
            id="name"
            v-model="form.name"
            label="Nama Produk"
            type="text"
            placeholder="Masukkan nama produk"
            :error="errors.name"
          />
        </div>

        <!-- Deskripsi Produk-->
        <div>
          <label for="runningText" class="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Produk <span class="text-red-500">*</span>
          </label>
          <textarea
            id="runningText"
            v-model="form.desc"
            rows="4"
            class="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-900 focus:border-green-900 transition-colors"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.desc }"
            placeholder="Isi dengan deskripsi produk disini..."
            :disabled="isSubmitting"
            maxlength="500"
            required
            aria-required="true"
            :aria-invalid="!!errors.desc"
            aria-describedby="text-error counter-info"
          ></textarea>
          <div class="flex justify-between items-center mt-1">
            <p id="text-error" v-if="errors.desc" class="text-sm text-red-600">{{ errors.desc }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3">
          <BaseButton
            @click="closeModal"
            type="button"
            :disabled="isSubmitting"
            variant="secondary"
          >
            Batal
          </BaseButton>
          <BaseButton
            type="submit"
            variant="primary"
            :disabled="!((form.name || '').trim() && (form.desc || '').trim())"
            @click="handleSubmit"
          >
            <span v-if="isSubmitting">Menyimpan...</span>
            <span v-else>Simpan Perubahan</span>
          </BaseButton>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Notification -->
  <Notification
    :showNotification="showNotification"
    :notificationType="notificationType"
    :notificationMessage="notificationMessage"
    @close="showNotification = false"
  />
</template>
