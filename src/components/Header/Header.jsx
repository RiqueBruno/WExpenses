import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="header">
        <img src="" alt="Icon WExpenses" />
        <div>
          <p data-testid="email-field" className="emailHeader">
            {email}
          </p>
          <div className="headerValue">
            <p data-testid="total-field" className="moneyQuantity">
              {expenses
                .reduce((acc, expense) => {
                  const { currency, value, exchangeRates } = expense;
                  const rates = Object.values(exchangeRates).filter(
                    ({ code, codein }) => code !== 'USDT' && codein !== 'BRLT'
                  );
                  const exchangeRatesFilter = rates.filter(
                    ({ code }) => code === currency
                  );
                  acc += Number(exchangeRatesFilter[0].ask) * Number(value);
                  return acc;
                }, 0)
                .toFixed(2)}
            </p>
            <p data-testid="header-currency-field" className="brl">
              BRL{' '}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      currency: PropTypes.string,
      exchangeRates: PropTypes.shape({
        ask: PropTypes.string,
      }),
    })
  ),
}.isRequired;

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
