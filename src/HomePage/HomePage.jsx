import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { creditCardActions } from '../_actions';
import { transactionActions } from '../_actions';
import { CreditCardSave } from '../_components';
import { TransactionSave } from '../_components';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getCreditCards();
        this.props.getTransactions();
    }

    handleReadCreditCard(guid) {
        return (e) => this.props.readCreditCard(guid);
    }

    render() {
        const { user, creditCards, transactions } = this.props;
        return (
            <div className="col-md-8 col-md-offset-3">
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <h4>Hi {user.firstName}!</h4>
                <CreditCardSave />
                <h2>Credit Cards</h2>
                {creditCards.loading && <em>Loading credit cards...</em>}
                {creditCards.error && <span className="text-danger">ERROR: {creditCards.error}</span>}
                {creditCards.items &&
                    <ul>
                        {creditCards.items.map((creditCardItem, index) =>
                            <li key={creditCardItem.guid}>
                                <div className="row">
                                    <strong className="col-md-6">{creditCardItem.binNumber}***{creditCardItem.lastFour}</strong>
                                    <div className="col-md-6"><TransactionSave token={creditCardItem.token} /></div>
                                </div>
                            </li>
                        )}
                    </ul>
                }
                <h2>Transactions</h2>
                {transactions.loading && <em>Loading transactions...</em>}
                {transactions.error && <span className="text-danger">ERROR: {transactions.error}</span>}
                {transactions.items &&
                    <ul>
                        {transactions.items.map((transactionItem, index) =>
                            <li className="row">
                                <div className="col-md-6">€{transactionItem.amount}</div>
                                <div className="col-md-6">{transactionItem.createdAt}</div>
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

function mapState(state) {
    const { authentication, creditCards, transactions } = state;
    const { user } = authentication;
    return { user, creditCards, transactions };
}

const actionCreators = {
    getCreditCards: creditCardActions.list,
    readCreditCard: creditCardActions.read,
    getTransactions: transactionActions.list
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };