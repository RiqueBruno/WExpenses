import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delExpense } from '../../redux/actions';
import './Table.css';

class Table extends Component {
  handlerClickDelBtn = (event) => {
    const { id } = event.target;
    const { dispatch } = this.props;
    dispatch(delExpense(id));
  };

  renderExpenseRow({ id, value, description, currency, method, tag, exchangeRates }) {
    const { name, ask } = exchangeRates[currency];

    return (
      <tr key={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{Number(value).toFixed(2)}</td>
        <td>{name}</td>
        <td>{Number(ask).toFixed(2)}</td>
        <td>{(Number(value) * Number(ask)).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            id={ id }
            data-testid="delete-btn"
            onClick={ this.handlerClickDelBtn }
          >
            Del
          </button>
          <button id={ id }>Edit</button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <section className="sectionTable">
        <table className="table">
          <thead className="tableHeaderLine">
            <tr>
              <th className="tableHeader">Descrição</th>
              <th className="tableHeader">Tag</th>
              <th className="tableHeader">Método de pagamento</th>
              <th className="tableHeader">Valor</th>
              <th className="tableHeader">Moeda</th>
              <th className="tableHeader">Câmbio utilizado</th>
              <th className="tableHeader">Valor convertido</th>
              <th className="tableHeader">Moeda de conversão</th>
              <th className="tableHeader">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => this.renderExpenseRow(expense))}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf,
  dispatch: PropTypes.func,
}.IsRequired;

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
