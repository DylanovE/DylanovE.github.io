import axios from 'axios';
import {usePopupNotification} from './usePopupNotification';

export function useCrudApi() {

    const {showMessage} = usePopupNotification();
    const apiToken = sessionStorage.apiToken;
    const apiUrl = 'http://localhost:8000/wizkids/';

    const CRUD = async(type, wizkid) => {
        try {
            let url = apiUrl;

            if (type === 'put' || type === 'delete') {
                url += `/${wizkid.id}`;
            }
            const response = await axios[type](url, wizkid, {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            });

            return response.data.data;
        } catch (error) {

            showMessage(error);
            return error;
        }
    };

    return {CRUD};
}
