import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currenciesApi());
  }

  handlerChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <label htmlFor="inputValue">
          Valor:
          <input
            type="number"
            name="value"
            id="inputValue"
            data-testid="value-input"
            min="0"
            value={ value }
            onChange={ this.handlerChange }
          />
        </label>
        <label htmlFor="inputDescript">
          Descrição:
          <input
            type="text"
            name="description"
            id="inputDescript"
            data-testid="description-input"
            value={ description }
            onChange={ this.handlerChange }
          />
        </label>
        <label htmlFor="inputCurrency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="inputCurrency"
            value={ currency }
            onChange={ this.handlerChange }
          >
            { currencies.map((acronym) => (
              <option
                key={ acronym }
                value={ acronym }
              >
                { acronym }
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="inputMethod">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="inputMethod"
            value={ method }
            onChange={ this.handlerChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="inputTag">
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            id="inputTag"
            value={ tag }
            onChange={ this.handlerChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
