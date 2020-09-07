import { creditCardConstants } from '../_constants';

export function creditCard(state = {}, action) {
  switch (action.type) {
    case creditCardConstants.READ_SUCCESS:
      return {
        item: action.creditCard
      };
    case creditCardConstants.READ_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}