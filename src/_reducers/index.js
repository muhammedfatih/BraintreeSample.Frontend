import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { creditCardSave } from './creditCardSave.reducer';
import { creditCard } from './creditCard.reducer';
import { creditCards } from './creditCards.reducer';
import { transactionSave } from './transactionSave.reducer';
import { transactions } from './transactions.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  creditCardSave,
  creditCard,
  creditCards,
  transactions,
  transactionSave,
  alert
});

export default rootReducer;