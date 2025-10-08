import api from '@/service/api';

export const daftar_surveyor = async (param: any) => {
  try {
    const response = await api.post('/surveyor/list', param);
    return response.data;
  } catch (error) {
    console.error('Error daftar surveyor', error);
    throw error;
  }
};

export const detail_surveyor = async (param: any) => {
  try {
    const response = await api.post('/surveyor/detail', param);
    return response.data;
  } catch (error) {
    console.error('Error daftar surveyor', error);
    throw error;
  }
};

export const add_surveyor = async (param: any) => {
  try {
    const response = await api.post('/surveyor/add', param);
    return response.data;
  } catch (error) {
    console.error('Error add surveyor', error);
    throw error;
  }
};

export const edit_surveyor = async (param: any) => {
  try {
    const response = await api.post('/surveyor/update', param);
    return response.data;
  } catch (error) {
    console.error('Error edit surveyor', error);
    throw error;
  }
};

export const delete_surveyor = async (param: any) => {
  try {
    const response = await api.post('/surveyor/delete', param);
    return response.data;
  } catch (error) {
    console.error('Error delete surveyor', error);
    throw error;
  }
};
