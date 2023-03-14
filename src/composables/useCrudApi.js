import axios from 'axios';
import { usePopupMessage } from './usePopupMessage';

export function useCrudApi() {
  const apiUrl = 'http://localhost:8000/wizkids';
  
  const { showMessage } = usePopupMessage();

  const fetchWizkids = async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data.data;
    } catch (error) {
      console.error(error);
      showMessage(error.message);
      return [];
    }
  };

  const createWizkid = async (wizkid) => {
    try {
      const response = await axios.post(apiUrl, wizkid);
      showMessage('Wizkid deleted successfully', 1);
      return response.data;
    } catch (error) {
      console.error(error);
      showMessage(error.message);
      return null;
    }
  };

  const updateWizkid = async (id, updatedWizkid) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedWizkid);
      showMessage('Wizkid deleted successfully', 1);
      return response.data;
    } catch (error) {
      console.error(error);
      showMessage(error.message);
      return null;
    }
  };

  const deleteWizkid = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      showMessage('Wizkid deleted successfully', 1);
      return !!response;
    } catch (error) {
      showMessage(error.message);
      return false;
    }
  };

  return { fetchWizkids, createWizkid, updateWizkid, deleteWizkid };
}
