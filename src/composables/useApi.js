import axios from 'axios';

export function useApi() {
    const apiToken = sessionStorage.apiToken;
    const apiUrl = 'http://localhost:8000/';

    const api = async(type, wizkid) => {
        try {
            let url = apiUrl + 'wizkids/';

            if (type === 'put' || type === 'delete') {
                url += `/${wizkid.id}`;
            }

            let config = {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            };

            if (type !== 'get' && wizkid !== undefined) {
                config = {
                    ...config,
                    data: wizkid,
                };
            }

            const response = await axios[type](url, config);

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
