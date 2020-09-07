import React from 'react';
import { creditCardActions } from '../_actions';
import { connect } from 'react-redux';

class CreditCardSave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            creditCard: {
                cardNumber: '',
                expirationMonth: 0,
                expirationYear: 0,
                cvv: 0
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { creditCard } = this.state;
        this.setState({
            creditCard: {
                ...creditCard,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { creditCard } = this.state;
        if (creditCard.cardNumber && creditCard.expirationMonth && creditCard.expirationYear && creditCard.cvv) {
            this.props.create(creditCard);
        }
    }

    render() {
        const { creating } = this.props;
        const { creditCard, submitted } = this.state;
        return (
            <div className="col-md-12">
                <h2>Save Your Credit Card</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !creditCard.cardNumber ? ' has-error' : '')}>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="text" className="form-control" name="cardNumber" value={creditCard.cardNumber} onChange={this.handleChange} />
                        {submitted && !creditCard.cardNumber &&
                            <div className="help-block">CardNumber is required</div>
                        }
                    </div>
                    <div className="row">
                        <div className={'col-md-4 form-group' + (submitted && !creditCard.expirationYear ? ' has-error' : '')}>
                            <label htmlFor="expirationYear">Exp Year</label>
                            <input type="number" className="form-control" name="expirationYear" value={creditCard.expirationYear} onChange={this.handleChange} />
                            {submitted && !creditCard.expirationYear &&
                                <div className="help-block">Expiration Year is required</div>
                            }
                        </div>
                        <div className={'col-md-4 form-group' + (submitted && !creditCard.expirationMonth ? ' has-error' : '')}>
                            <label htmlFor="expirationMonth">Exp Month</label>
                            <input type="number" className="form-control" name="expirationMonth" value={creditCard.expirationMonth} onChange={this.handleChange} />
                            {submitted && !creditCard.expirationMonth &&
                                <div className="help-block">Expiration Month is required</div>
                            }
                        </div>
                        <div className={'col-md-4 form-group' + (submitted && !creditCard.cvv ? ' has-error' : '')}>
                            <label htmlFor="cvv">CVV</label>
                            <input type="number" className="form-control" name="cvv" value={creditCard.cvv} onChange={this.handleChange} />
                            {submitted && !creditCard.cvv &&
                                <div className="help-block">CVV is required</div>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Save</button>
                        {creating &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { creating } = state.creditCardSave;
    return { creating };
}

const actionCreators = {
    create: creditCardActions.create
}

const connectedCreditCardSaveComponent = connect(mapState, actionCreators)(CreditCardSave);
export { connectedCreditCardSaveComponent as CreditCardSave };