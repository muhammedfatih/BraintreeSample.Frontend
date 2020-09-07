import React from 'react';
import { transactionActions } from '../_actions';
import { connect } from 'react-redux';

class TransactionSave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transaction: {
                amount:0,
                token:''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { transaction } = this.state;
        this.setState({
            transaction: {
                ...transaction,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { transaction } = this.state;
        if (transaction.amount && transaction.token) {
            this.props.create(transaction);
        }
    }

    render() {
        const { creating } = this.props;
        const { transaction, submitted } = this.state;
        const { token } = this.props;
        transaction.token=token;

        return (
            <div className="col-md-12">
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <input className="hidden" type="text" defaultValue={token} name="token" />
                        <div className={'col-md-8 form-group' + (submitted && !transaction.amount ? ' has-error' : '')}>
                            <input type="text" className="form-control" name="amount" defaultValue={transaction.amount} onChange={this.handleChange} />
                            {submitted && !transaction.amount &&
                                <div className="help-block">Amount is required</div>
                            }
                        </div>
                        <div className="col-md-1 form-group">
                            <button className="btn btn-primary">Charge</button>
                            {creating &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { creating } = state.transactionSave;
    return { creating };
}

const actionCreators = {
    create: transactionActions.create
}

const connectedtransactionSaveComponent = connect(mapState, actionCreators)(TransactionSave);
export { connectedtransactionSaveComponent as TransactionSave };