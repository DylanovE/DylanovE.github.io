import axios from 'axios';
import router from '@/router';
import {usePopupNotification} from '@/composables/usePopupNotification';

const {showMessage} = usePopupNotification();

export function useApi() {
    const apiUrl = 'http://localhost:8000/';

    const api = async(type, wizkid) => {
        try {
            await validateToken();
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
            return 'OK';
        } else {
            let auth = {
                headers: {
                    Authorization: `Bearer ${localStorage.api_token}`,
                },
            };

            try {
                let url = apiUrl + 'auth/refresh';

                const response = await axios.get(url, auth);
                if (response.name == 'AxiosError') {
                    throw response.name;
                }

                return response.statusText; // returns OK
            } catch (error) {
                localStorage.clear();
                showMessage('unauthorized user!');
                router.push({name: 'home'});
                throw error; // throws AxiosError
            }
        }
    };

    return {api, login, validateToken};
}
