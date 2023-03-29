import axios from 'axios';

export function useApi() {
    const apiToken = sessionStorage.apiToken;
    const apiUrl = 'http://localhost:8000/';

    const api = async(type, wizkid) => {
        try {
            let url = apiUrl + 'wizkids/';

            if (type === 'put' || type === 'delete') {
                url += `${wizkid}`;
            }

            let auth = {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
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

    return {api, login};
}
