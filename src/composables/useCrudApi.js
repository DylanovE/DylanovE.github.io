import axios from 'axios';
import { usePopupNotification } from './usePopupNotification';

export function useCrudApi() {
  
  const { showMessage } = usePopupNotification();

  const apiToken = sessionStorage.apiToken
  const apiUrl = 'http://localhost:8000/wizkids/';

  const CRUD = async (type, id, wizkid) => {
    try {
      let response;
      switch (type) {
        case 'read':
          response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          });
          return response.data.data;
        case 'create':
          response = await axios.post(apiUrl, wizkid, {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          });
          showMessage('Wizkid created successfully', 'success');
          break;
        case 'update':
          console.log(type, id, wizkid)
          await axios.put(`${apiUrl}${id}/`, wizkid, {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          });
          showMessage('Wizkid updated successfully', 'success');
          break;
        case 'delete':
          await axios.delete(`${apiUrl}${id}`, {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          });
          showMessage('Wizkid deleted successfully', 'success');
          break;
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
      if (error.response.status === 422, type === 'create') {
        showMessage('email is wrong or already being used.', 0);
        return 'error'
      } else {
        showMessage(error.message, 0);
      }
      return error;
    }
  };
  

  return { CRUD };
}
