import axios from 'axios';
import { usePopupNotification } from './usePopupNotification';

export function useCrudApi() {
  
  const { showMessage } = usePopupNotification();

  const apiUrl = 'http://localhost:8000/wizkids';

  const CRUD = async (type, id, wizkid) => {
    try {
      let response;
      switch (type) {
        case 'read':
          response = await axios.get(apiUrl);
          return response.data.data;
        case 'create':
          await axios.post(apiUrl, wizkid);
          showMessage('Wizkid created successfully', 'success');
          break;
        case 'update':
          await axios.put(`${apiUrl}/${id}`, wizkid);
          showMessage('Wizkid updated successfully', 'success');
          break;
        case 'delete':
          await axios.delete(`${apiUrl}/${id}`);
          showMessage('Wizkid deleted successfully', 'success');
          return !!response;
        default:
          throw new Error(`Invalid type: ${type}`);
      }
      if (response) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error.message);
      showMessage(error.message, 0);
      return null;
    }
  };
  

  return { CRUD };
}
// @click.prevent="$attrs.type === 'create' ? createWizkid() : updateWizkid()"