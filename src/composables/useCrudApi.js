import axios from 'axios';
import { usePopupMessage } from './usePopupMessage';

export function useCrudApi() {
  
  const { showMessage } = usePopupMessage();

  const apiUrl = 'http://localhost:8000/wizkids';

  const CRUD = async (type, id, wizkid) => {
    try {
      let response;
      switch (type) {
        case 'create':
          response = await axios.post(apiUrl, wizkid);
          showMessage('Wizkid created successfully', 1);
          break;
        case 'read':
          response = await axios.get(apiUrl);
          return response.data.data;
        case 'update':
          response = await axios.put(`${apiUrl}/${id}`, wizkid);
          showMessage('Wizkid updated successfully', 1);
          break;
        case 'delete':
          response = await axios.delete(`${apiUrl}/${id}`);
          showMessage('Wizkid deleted successfully', 1);
          return !!response;
        default:
          throw new Error(`Invalid type: ${type}`);
      }
      return response.data;
    } catch (error) {
      console.error(error);
      showMessage(error.message);
      return null;
    }
  };
  

  return { CRUD };
}
