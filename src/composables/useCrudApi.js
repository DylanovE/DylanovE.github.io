import axios from 'axios';
import { Toast } from 'bootstrap';

export function useCrudApi() {
  const apiUrl = 'http://localhost:8000/wizkids/';

  const fetchWizkids = async () => {
    try {
      const response = await axios.get(apiUrl);
      return(response.data.data);
    } catch (error) {
      console.error(error);
      showErrorMessage(error.message);
    }
  };

  const showErrorMessage = (message) => {
    const toast = new Toast(document.querySelector('.error-toast'));
    const toastBody = document.querySelector('.error-toast .toast-body');
    toastBody.textContent = message;
    toast.show();
    setTimeout(() => {
      toast.hide();
    }, 2000);
  };

  fetchWizkids();

  return { fetchWizkids };
}
