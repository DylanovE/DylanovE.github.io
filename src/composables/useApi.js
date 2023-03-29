import axios from 'axios';
import {usePopupNotification} from '@/composables/usePopupNotification';

const {showMessage} = usePopupNotification();

export function useApi() {
    const api_token = sessionStorage.api_token;
    const apiUrl = 'http://localhost:8000/';

    const api = async(type, wizkid) => {
        try {
            if (api_token) {
                const response = validateToken();
                console.log(response);
                if (response.name == 'AxiosError') {
                    throw response.response.data.message;
                }
            }

            let url = apiUrl + 'wizkids/';

            if (type === 'put' || type === 'delete') {
                url += `${wizkid.id}`;
                if (wizkid.profilePicture !== String) {
                    delete wizkid.profilePicture;
                }
            }

            let auth = {
                headers: {
                    Authorization: `Bearer ${api_token}`,
                },
            };

            let response;
            if (wizkid !== undefined) {
                response = await axios[type](url, wizkid, auth);
            } else {
                response = await axios[type](url, auth);
            }

            return response.data;
        } catch (error) {
            return error;
        }
    };

    const login = async(wizkid) => {
        try {
            let url = apiUrl + 'auth/login';

            const response = await axios.post(url, wizkid);

            return response;
        } catch (error) {
            return error;
        }
    };

    async function validateToken() {
        let auth = {
            headers: {
                Authorization: `Bearer ${api_token}`,
            },
        };

        try {
            let url = apiUrl + 'auth/refresh';

            const response = await axios.get(url, auth);
            if (response.name == 'AxiosError') {
                throw response;
            }
        } catch (error) {
            sessionStorage.clear();
            showMessage('You are not a authorized user!');
            location.reload();
        }
    };

    return {api, login};
}
