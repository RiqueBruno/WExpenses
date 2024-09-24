import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { delExpense, idExpenseEditing } from '../../redux/actions';
import '../../styles/scroll.css';

const tableHeaders = [
  { id: 1, title: 'Descrição' },
  { id: 2, title: 'Tag' },
  { id: 3, title: 'Método de pagamento' },
  { id: 4, title: 'Valor' },
  { id: 5, title: 'Moeda' },
  { id: 6, title: 'Câmbio' },
  { id: 7, title: 'Valor convertido' },
  { id: 8, title: 'Moeda de conversão' },
  { id: 9, title: 'Painel' },
];

class Table extends Component {
  handlerClickDelBtn = (event) => {
    const { id } = event.currentTarget;
    const { dispatch } = this.props;

    dispatch(delExpense(id));
  };

  handlerClickEditBtn = (event) => {
    const { id } = event.currentTarget;
    const { dispatch } = this.props;

    dispatch(idExpenseEditing(Number(id)));
  };

  renderExpenseRow({
    id,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  }) {
    const { name, ask } = exchangeRates[currency];

    return (
      <tr
        key={id}
        className="flex flex-row w-full h-28 p-4 border-b border-primary"
      >
        <td className="flex justify-center items-center text-center w-32">
          {description}
        </td>
        <td className="flex justify-center items-center text-center w-32">
          {tag}
        </td>
        <td className="flex justify-center items-center text-center w-32">
          {method}
        </td>
        <td className="flex justify-center items-center text-center w-32">
          {Number(value).toFixed(2)}
        </td>
        <td className="flex justify-center items-center text-center w-32">
          {name}
        </td>
        <td className="flex justify-center items-center text-center w-32">
          {Number(ask).toFixed(2)}
        </td>
        <td className="flex justify-center items-center text-center w-32">
          {(Number(value) * Number(ask)).toFixed(2)}
        </td>
        <td className="flex justify-center items-center text-center w-32">
          Real
        </td>
        <td className="flex justify-center items-center text-center w-32">
          <button
            id={id}
            className="mx-2 hover:bg-grayOrangeLight"
            onClick={this.handlerClickDelBtn}
          >
            <AiFillDelete color="red" />
          </button>
          <button
            id={id}
            className="mx-2 hover:bg-grayOrangeLight"
            onClick={this.handlerClickEditBtn}
          >
            <AiFillEdit color="orange" />
          </button>
        </td>
      </tr>
    );
  }

  renderExpenseRowH = (expense) => {
    const { id, title } = expense;
    return (
      <th
        key={id}
        className="text-center h-full w-32 border-x border-white px-2"
      >
        {title}
      </th>
    );
  };

  render() {
    const { expenses } = this.props;

    return (
      <article className="w-full h-96 md:w-full md:max-h-[800px] md:h-[700px] overflow-x-auto overflow-y-scroll bg-gray border-2 border-primary rounded-md p-8 md:shadow-custom scrollClass">
        <table className="w-full h-fit">
          <thead className="w-full h-20">
            <tr className="flex flex-row w-full h-20 p-4 border-b border-white text-white">
              {tableHeaders.map((header) => this.renderExpenseRowH(header))}
            </tr>
          </thead>
          <tbody className="w-full h-20">
            {expenses.map((expense) => this.renderExpenseRow(expense))}
          </tbody>
        </table>
      </article>
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
