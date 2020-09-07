import { transactionConstants } from '../_constants';

export function transactions(state = {}, action) {
  switch (action.type) {
    case transactionConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case transactionConstants.GETALL_SUCCESS:
      return {
        items: action.transactions
      };
    case transactionConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}