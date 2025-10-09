import api from '@/service/api';

export const list = async (param: any) => {
  try {
    const response = await api.post('/product/list', param);
    return response.data;
  } catch (error) {
    console.error('Gagal:', error);
    throw error;
  }
};

export const add_product = async (param: any) => {
  try {
    const response = await api.post('/product/add', param);
    return response.data;
  } catch (error) {
    console.error('Gagal menambahkan product:', error);
    throw error;
  }
};

export const delete_product = async (id: number) => {
  try {
    const response = await api.post(`/product/delete`, { id: id });
    return response.data;
  } catch (error) {
    console.error('Gagal:', error);
    throw error;
  }
};

export const get_info_edit = async (id: number) => {
  try {
    const response = await api.post('/product/get_info_edit', { id: id });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil informasi product:', error);
    throw error;
  }
};

export const update_product = async (param: any) => {
  try {
    const response = await api.post(`/product/update`, param);
    return response.data;
  } catch (error) {
    console.error('Gagal mengedit product:', error);
    throw error;
  }
};
