import { creditCardConstants } from '../_constants';

export function creditCards(state = {}, action) {
  switch (action.type) {
    case creditCardConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case creditCardConstants.GETALL_SUCCESS:
      return {
        items: action.creditCards
      };
    case creditCardConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}