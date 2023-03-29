import axios from 'axios';
import {usePopupNotification} from '@/composables/usePopupNotification';

const {showMessage} = usePopupNotification();

export function useApi() {
    const apiUrl = 'http://localhost:8000/';

    const api = async(type, wizkid) => {
        try {
            let url = apiUrl + 'wizkids/';

            if (type === 'put' || type === 'delete') {
                url += `${wizkid.id}`;
                if (wizkid.profilePicture !== String) {
                    delete wizkid.profilePicture;
                }
            }

            let auth = {
                headers: {
                    Authorization: `Bearer ${localStorage.api_token}`,
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
        if (localStorage.api_token == undefined) {
            return 'success';
        }else{
            let auth = {
                headers: {
                    Authorization: `Bearer ${localStorage.api_token}`,
                },
            };

            try {
                let url = apiUrl + 'auth/refresh';

                const response = await axios.get(url, auth);
                if (response.name == 'AxiosError') {
                    throw response;
                }
                return response;
            } catch (error) {
                localStorage.clear();
                showMessage('unauthorized user!');
            }
        }

    };

    return {api, login, validateToken};
}
