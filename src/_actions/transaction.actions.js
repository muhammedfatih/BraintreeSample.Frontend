import { transactionConstants } from '../_constants';
import { transactionService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const transactionActions = {
    create,
    list
};

function create(transaction) {
    return dispatch => {
        dispatch(request(transaction));

        transactionService.create(transaction)
            .then(
                transaction => { 
                    dispatch(success());
                    // history.push('/');
                    dispatch(alertActions.success('Transaction sent successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(transactionToCreate) { return { type: transactionConstants.CREATE_REQUEST, transactionToCreate } }
    function success(transactionToCreate) { return { type: transactionConstants.CREATE_SUCCESS, transactionToCreate } }
    function failure(error) { return { type: transactionConstants.CREATE_FAILURE, error } }
}

function list() {
    return dispatch => {
        dispatch(request());

        transactionService.list()
            .then(
                transactions => dispatch(success(transactions)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: transactionConstants.GETALL_REQUEST } }
    function success(transactions) { return { type: transactionConstants.GETALL_SUCCESS, transactions } }
    function failure(error) { return { type: transactionConstants.GETALL_FAILURE, error } }
}