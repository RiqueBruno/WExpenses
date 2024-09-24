import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo-noBg.svg';
import coinIcon from '../../assets/images/coins.svg';
import profileIcon from '../../assets/images/profile.svg';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const moneyQtt = expenses
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
      .toFixed(2);

    return (
      <header className="text-primary flex w-full h-16 justify-between items-center mb-4 z-[99]">
        <img
          src={logo}
          alt="Icon WExpenses"
          className="w-24 h-20 md:ml-40 md:h-28 md:w-32"
        />
        <nav className="flex w-[66%]">
          <a
            href='/carteira'
            className="flex items-center w-[50%] text-xs md:justify-center"
          >
              <img src={coinIcon} alt="Icon Dinheiro" className="mr-1 w-6 h-6" />
              <p className='hidden md:block md:mr-2'>Despesas: </p>
              {` ${moneyQtt} BRL`}
          </a>
          <a
            href='/carteira'
            className="flex items-center w-[50%] text-xs md:justify-center"
          >
            <img src={profileIcon} alt="Icon Email" className="mr-1 w-6 h-6" />
            <p className='hidden md:block md:mr-2'>Email:</p>
            {email || 'user@email.com'}
          </a>
        </nav>
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
