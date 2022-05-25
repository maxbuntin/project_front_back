import { instance, notification } from "./instanse.jsx";



export const getUsers = async () => {
  try {
    const res = await instance.get('Users/getUsers');
    return res;
  } catch (error) {
    notification(error.response?.status, error.message);
  }
};

export const addUser = async (data) => {
  try {
    const res = await instance.post(`Users/createUser`, data);
    return res;
  } catch (error) {
    notification(error.response?.status, error.message);
  }
};
export const updateUser = async (id, data) => {
    try {
      const res = await instance.put(`Users/updateUser?id=${id}`, data);
      return res;
    } catch (error) {
      notification(error.response?.status, error.message);
    }
};

export const deleteUser = async (itemId) => {
  try {
    const res = await instance.delete(`Users/deleteUser?id=${itemId}`);
    return res;
  } catch (error) {
    notification(error.response?.status, error.message);
  }
};

