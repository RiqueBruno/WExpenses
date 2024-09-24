import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  currenciesApi,
  putExpenses,
  hrCkToSaveExpenseEdited,
} from '../../redux/actions';

import Input from '../Input/Input.tsx';
import Select from '../Select/Select.tsx';

const defaultTag = 'Alimentação';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: defaultTag,
    isEditing: false,
    newExpense: false,
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
      tag: defaultTag,
      isEditing: false,
      newExpense: false,
    });

  handlerClick = () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newState = { value, description, currency, method, tag, newExpense: false };
    dispatch(putExpenses(newState));
    this.defaultState();
  };

  hrCkToSaveExpenseEditeds = () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newState = { value, description, currency, method, tag, newExpense: false };
    dispatch(hrCkToSaveExpenseEdited(newState));
    this.defaultState();
  };

  canOpenFormClick = () => {
    this.setState((prevState) => ({
      newExpense: !prevState.newExpense,
    }));
  };

  render() {
    const { currencies, isEditingTrue } = this.props;
    const { value, description, currency, method, tag, newExpense } = this.state;
    const canOpenForm = isEditingTrue || newExpense === true;
    const paymentMethods = [
      'Dinheiro',
      'Pix',
      'Cartão de crédito',
      'Cartão de débito',
    ];
    const expenseCategories = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
        
    return (
      <article className="md:w-[28%] z-[0] md:h-full md:bg-orangeTranparent md:border-2 md:border-primary md:rounded-md py-6 px-2 pb-8 flex flex-col justify-center items-center md:mr-8">
          <button
            type="button"
            className={`${canOpenForm ? "hidden" : "block md:hidden"} bg-bg-btn-gradient hover:bg-bg-btn-gradient-reverse text-white p-2 rounded-md`}
            onClick={this.canOpenFormClick}
          >
            Nova despesa
          </button>
              <form className={`bg-orangeTranparent z-[0] animate-slide-down transition md:animate-none ${canOpenForm ? "block" : "hidden"} md:block w-full flex-col flex justify-center px-8 py-4 rounded-md border-2 border-primary md:border-none`}>
                <h2 className="w-full text-center text-lg mb-8">Adicione suas Despesas</h2>
                <Input
                  type="number"
                  name="value"
                  id="inputValue"
                  placeholder='0'
                  min="0"
                  value={value}
                  label="Valor"
                  onChange={this.handlerChange}
                />        
                <Input
                  type="text"
                  name="description"
                  id="inputDescript"
                  placeholder='Descrição'
                  value={description}
                  label="Descrição"
                  onChange={this.handlerChange}
                />
                <Select
                  label='Moeda'
                  name="currency"
                  value={currency}
                  onChange={this.handlerChange}
                  options={currencies}
                />        
                <Select
                  label='Método de pagamento'
                  name="method"
                  value={method}
                  onChange={this.handlerChange}
                  options={paymentMethods}
                />
                <Select
                  label='Categoria'
                  name="tag"
                  value={tag}
                  onChange={this.handlerChange}
                  options={expenseCategories}
                />
        
                {isEditingTrue ? (
                  <button
                    type="button"
                    className=" bg-bg-btn-gradient hover:bg-bg-btn-gradient-reverse text-white p-2 rounded-md mt-4 w-full"
                    onClick={this.hrCkToSaveExpenseEditeds}
                  >
                    Editar despesa
                  </button>
                ) : (
                  <button
                    type="button"
                    className=" bg-bg-btn-gradient hover:bg-bg-btn-gradient-reverse text-white p-2 rounded-md mt-4 w-full"
                    onClick={this.handlerClick}
                  >
                    Salvar despesa
                  </button>
                )}
              </form>        
      </article>
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
