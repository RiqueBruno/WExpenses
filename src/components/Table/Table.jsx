import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { delExpense, idExpenseEditing } from '../../redux/actions';
import './Table.css';

class Table extends Component {
  handlerClickDelBtn = (event) => {
    const { id } = event.target;
    const { dispatch } = this.props;
    dispatch(delExpense(id));
  };

  handlerClickEditBtn = (event) => {
    const { id } = event.target;
    const { dispatch } = this.props;
    dispatch(idExpenseEditing(Number(id)));
  };

  renderExpenseRow({ id, value, description, currency, method, tag, exchangeRates }) {
    const { name, ask } = exchangeRates[currency];

    return (
      <tr key={ id } className="trLine">
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
            className="btnTable"
            data-testid="delete-btn"
            onClick={ this.handlerClickDelBtn }
          >
            <AiFillDelete color="red" />
          </button>
          <button
            id={ id }
            className="btnTable"
            data-testid="edit-btn"
            onClick={ this.handlerClickEditBtn }
          >
            <AiFillEdit color="green" />
          </button>
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
          <tbody className="tbody">
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
