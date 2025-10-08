import api from '@/service/api';

export const list = async (params?: { year?: number }) => {
  try {
    const response = await api.get('/rekap_pengumpulan/list', {
      params, // ⬅️ kirim query param ke backend
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil rekap pengumpulan:', error);
    throw error;
  }
};
