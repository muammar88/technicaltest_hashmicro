import api from '@/service/api';

export const list_rekap_distribusi_per_asnaf = async (params?: { year?: number }) => {
  try {
    const response = await api.get('/rekap_distribusi_per_asnaf/list', {
      params, // ⬅️ kirim query param ke backend
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil rekap distribusi per asnaf:', error);
    throw error;
  }
};
