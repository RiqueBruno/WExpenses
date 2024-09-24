import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  currenciesApi,
  putExpenses,
  hrCkToSaveExpenseEdited,
} from '../../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    isEditing: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currenciesApi());
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.isEditingTrue &&
      nextProps.isEditingTrue !== nextState.isEditing
    ) {
      const { idTargetEditing, expenses } = nextProps;
      const findExpenseById = expenses[idTargetEditing];
      if (typeof findExpenseById !== 'undefined') {
        const { value, description, currency, method, tag } = findExpenseById;
        this.setState({
          value,
          description,
          currency,
          method,
          tag,
          isEditing: true,
        });
      }
    }
    return true;
  }

  handlerChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  defaultState = () =>
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      isEditing: false,
    });

  handlerClick = () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newState = { value, description, currency, method, tag };
    dispatch(putExpenses(newState));
    this.defaultState();
  };

  hrCkToSaveExpenseEditeds = () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newState = { value, description, currency, method, tag };
    dispatch(hrCkToSaveExpenseEdited(newState));
    this.defaultState();
  };

  render() {
    const { currencies, isEditingTrue } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <article className="md:w-[28%] md:h-full md:border-2 md:border-primary md:rounded-md py-6 px-2 pb-8 flex flex-col justify-center items-center md:mr-8">
          <button
            type="button"
            className={`${canOpenForm ? "hidden" : "block md:hidden"} bg-bg-btn-gradient hover:bg-bg-btn-gradient-reverse text-white p-2 rounded-md`}
            onClick={this.canOpenFormClick}
          >
            Nova despesa
          </button>
              <form className={`${canOpenForm ? "block" : "hidden"} md:block w-full flex-col flex justify-center px-8`}>
                <h2 className="w-full text-center text-lg mb-8">Adicione suas Despesas</h2>
                <Input
                  type="number"
                  name="value"
                  id="inputValue"
          data-testid="value-input"
          min="0"
          value={value}
          onChange={this.handlerChange}
        />

        <label htmlFor="inputDescript">Descrição:</label>
        <input
          type="text"
          name="description"
          id="inputDescript"
          data-testid="description-input"
          value={description}
          onChange={this.handlerChange}
        />

        <label htmlFor="inputCurrency">Moeda:</label>
        <select
          data-testid="currency-input"
          name="currency"
          id="inputCurrency"
          value={currency}
          onChange={this.handlerChange}
        >
          {currencies.map((acronym) => (
            <option key={acronym} value={acronym}>
              {acronym}
            </option>
          ))}
        </select>

        <label htmlFor="inputMethod">Método de pagamento:</label>
        <select
          data-testid="method-input"
          name="method"
          id="inputMethod"
          value={method}
          onChange={this.handlerChange}
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <label htmlFor="inputTag">Tag:</label>
        <select
          data-testid="tag-input"
          name="tag"
          id="inputTag"
          value={tag}
          onChange={this.handlerChange}
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        {isEditingTrue ? (
          <button
            type="button"
            className="btn"
            onClick={this.hrCkToSaveExpenseEditeds}
          >
            Editar despesa
          </button>
        ) : (
          <button type="button" className="btn" onClick={this.handlerClick}>
            Adicionar despesa
          </button>
        )}
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
  isEditingTrue: globalState.wallet.isEditingTrue,
  idTargetEditing: globalState.wallet.idTargetEditing,
  // aprendi que da pra usar também  ...globalState.wallet, que já pega todos.
});

export default connect(mapStateToProps)(WalletForm);
