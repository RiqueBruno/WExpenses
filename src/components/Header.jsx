import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <img src="" alt="" />
        <div>
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p data-testid="header-currency-field">BRL</p>
          <p data-testid="total-field">
            {
              expenses.reduce((acc, expense) => {
                const { currency, value, exchangeRates } = expense;
                const rates = Object.values(exchangeRates)
                  .filter(({ code, codein }) => code !== 'USDT' && codein !== 'BRLT');
                const exchangeRatesFilter = rates.filter(({ code }) => code === currency);
                acc += Number(exchangeRatesFilter[0].ask) * Number(value);
                return acc;
              }, 0).toFixed(2)
            }
          </p>
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
    }),
  ),
}.isRequired;

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
