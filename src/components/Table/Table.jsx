import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
  render() {
    return (
      <section className="sectionTable">
        <table className="table">
          <thead className="tableHeaderLine">
            <th className="tableHeader">Descrição</th>
            <th className="tableHeader">Tag</th>
            <th className="tableHeader">Método de pagamento</th>
            <th className="tableHeader">Valor</th>
            <th className="tableHeader">Moeda</th>
            <th className="tableHeader">Câmbio utilizado</th>
            <th className="tableHeader">Valor convertido</th>
            <th className="tableHeader">Moeda de conversão</th>
            <th className="tableHeader">Editar/Excluir</th>
          </thead>
        </table>
      </section>
    );
  }
}

export default Table;
