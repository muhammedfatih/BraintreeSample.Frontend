import { creditCardConstants } from '../_constants';
import { creditCardService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const creditCardActions = {
    create,
    remove,
    list
};

function create(creditCard) {
    return dispatch => {
        dispatch(request(creditCard));

        creditCardService.create(creditCard)
            .then(
                creditCard => { 
                    dispatch(success());
                    // history.push('/');
                    dispatch(alertActions.success('CreditCard sent successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(creditCardToCreate) { return { type: creditCardConstants.CREATE_REQUEST, creditCardToCreate } }
    function success(creditCardToCreate) { return { type: creditCardConstants.CREATE_SUCCESS, creditCardToCreate } }
    function failure(error) { return { type: creditCardConstants.CREATE_FAILURE, error } }
}

function list() {
    return dispatch => {
        dispatch(request());

        creditCardService.list()
            .then(
                creditCards => dispatch(success(creditCards)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: creditCardConstants.GETALL_REQUEST } }
    function success(creditCards) { return { type: creditCardConstants.GETALL_SUCCESS, creditCards } }
    function failure(error) { return { type: creditCardConstants.GETALL_FAILURE, error } }
}

function remove(guid) {
    return dispatch => {
        dispatch(request(guid));

        creditCardService.delete(guid)
            .then(
                creditCard => dispatch(success(creditCard)),
                error => dispatch(failure(guid, error.toString()))
            );
    };

    function request(guid) { return { type: creditCardConstants.DELETE_REQUEST, guid } }
    function success(creditCard) { return { type: creditCardConstants.READ_SUCCESS, creditCard } }
    function failure(guid, error) { return { type: creditCardConstants.READ_FAILURE, guid, error } }
}