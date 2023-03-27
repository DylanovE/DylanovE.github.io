import axios from 'axios';
import {usePopupNotification} from './usePopupNotification';

export function useCrudApi() {

    const {showMessage} = usePopupNotification();
    const apiToken = sessionStorage.apiToken;
    const apiUrl = 'http://localhost:8000/wizkids/';

    const CRUD = async(type, wizkid) => {
        try {
            const response = await axios[type](data, {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            });
            
            if (response) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            console.error(error.message);
            if (error.response.status === 422, type === 'create') {
                showMessage('email is wrong or already being used.', 0);
                return 'error';
            } else {
                showMessage(error.message, 0);
            }
            return error;
        }
    };

    const useCreate = async(wizkid) => {
        const data = wizkid;
        const response = await CRUD('post', data);
        console.log(response)
        return response.data;
    };

    const useRead = async() => {
        const response = await CRUD('get');
        console.log(response)
        return response.data;
    };

    const useUpdate = async(wizkid) => {
        const data = `${wizkid.id}/${wizkid}`;
        const response = await CRUD('put', data);
        console.log(response)
        return response.data;
    };

    const useDelete = async(wizkid) => {
        const data = `${wizkid.id}/${wizkid}`;
        const response = await CRUD('delete', data);
        console.log(response)
        return response.data;
    };

    return {useCreate, useRead, useUpdate, useDelete};
}
