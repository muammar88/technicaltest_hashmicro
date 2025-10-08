import api from '@/service/api';

export const get_riwayat_donasi = async (param: any) => {
  try {
    const response = await api.post('/riwayat_donasi/list', param);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil riwayat donasi:', error);
    throw error;
  }
};

export const get_info_edit_riwayat_donasi = async (id: number) => {
  try {
    const response = await api.post('/riwayat_donasi/riwayat_donasi_by_id', { id: id });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil informasi riwayat donasi:', error);
    throw error;
  }
};

export const delete_riwayat_donasi = async (id: number) => {
  try {
    const response = await api.post(`/riwayat_donasi/delete`, { id: id });
    return response.data;
  } catch (error) {
    console.error('Gagal menghapus riwayat donasi:', error);
    throw error;
  }
};
