import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesApi, putExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
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

  handlerClick = () => {
    const { dispatch } = this.props;
    dispatch(putExpenses(this.state));
    this.setState(() => ({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
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
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
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
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handlerClick }>Adicionar despesa</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
  // aprendi que da pra usar também  ...globalState.wallet, que já pega todos.
});

export default connect(mapStateToProps)(WalletForm);
