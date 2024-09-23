import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo-noBg.svg';
import coinIcon from '../../assets/images/coins.svg';
import profileIcon from '../../assets/images/profile.svg';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header">
        <img src={logo} alt="Icon WExpenses" />
        <div>
          <p data-testid="email-field" className="emailHeader">
            <img src={profileIcon} alt="Icon Email" />
            {email}
          </p>
          <div className="headerValue">
            <p data-testid="total-field" className="moneyQuantity">
              <img src={coinIcon} alt="Icon Coin" />
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
      </header>
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
