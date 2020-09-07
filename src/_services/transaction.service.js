import config from 'config';
import { authHeader } from '../_helpers';
import { userService } from '.'

export const transactionService = {
    create,
    list
};

function create(transactionToCreate) {
    const requestOptions = {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
        body: JSON.stringify(transactionToCreate)
    };
    return fetch(`${config.apiUrl}/api/transaction/sale`, requestOptions).then(handleResponse);
}

function list() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/transaction`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
        }
        const error = data.errors.length != 0 ? data.errors[0].message || response.statusText : "";
        if (error != "")
            return Promise.reject(error)
        else
            return data.data;
    });
}