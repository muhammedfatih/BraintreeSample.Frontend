import config from 'config';
import { authHeader } from '../_helpers';
import {userService} from '.'

export const creditCardService = {
    create,
    remove,
    list
};

function create(creditCardToCreate) {
    const requestOptions = {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
        body: JSON.stringify(creditCardToCreate)
    };
    return fetch(`${config.apiUrl}/api/creditCard/tokenize`, requestOptions).then(handleResponse);
}

function remove(guid) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/creditCard/${guid}`, requestOptions).then(handleResponse);
}

function list() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/creditCard/`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                location.reload(true);
            }
        }
        const error = data.errors.length!=0?data.errors[0].message || response.statusText:"";
        if (error!="")
            return Promise.reject(error)
        else
            return data.data;
});
}