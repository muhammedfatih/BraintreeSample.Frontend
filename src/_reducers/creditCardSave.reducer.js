import { creditCardConstants } from '../_constants';

export function creditCardSave(state = {}, action) {
  switch (action.type) {
    case creditCardConstants.CREATE_REQUEST:
      return { sent:false, sending: true };
    case creditCardConstants.CREATE_SUCCESS:
      return {sent:true, sending: false};
    case creditCardConstants.CREATE_FAILURE:
      return {sent:false, sending:false};
    default:
      return state
  }
}