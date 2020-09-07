import { transactionConstants } from '../_constants';

export function transactionSave(state = {}, action) {
  switch (action.type) {
    case transactionConstants.CREATE_REQUEST:
      return { sent:false, sending: true };
    case transactionConstants.CREATE_SUCCESS:
      return {sent:true, sending: false};
    case transactionConstants.CREATE_FAILURE:
      return {sent:false, sending:false};
    default:
      return state
  }
}