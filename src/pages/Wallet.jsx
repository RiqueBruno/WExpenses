import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChartComponent from '../components/ChartComponent/ChartComponent.tsx';
import Header from '../components/Header/Header';
import WalletForm from '../components/WalletForm/WalletForm';
import Table from '../components/Table/Table';
import { setExpenses } from '../redux/actions';
import '../styles/scroll.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { expenses, dispatch } = this.props;

    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (expenses.length === 0 && savedExpenses) {
      dispatch(setExpenses(savedExpenses));
    }
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    console.log(expenses);

    if (prevProps.expenses !== expenses) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }

  getTotalByTag(tag, expenses) {
    const result = expenses
      .filter((expense) => expense.tag === tag)
      .reduce((total, expense) => total + Number(expense.value), 0);
    return Number(result);
  }

  render() {
    const { expenses } = this.props;
    const options = {
      title: 'Despesas por Categoria',
      backgroundColor: 'none',
      legend: {
        position: 'bottom',
        textStyle: { color: '#ff5722', fontSize: 14 },
        titleTextStyle: { color: '#ffffff', fontSize: 16 },
      },
      hAxis: {
        title: 'Categoria',
        textStyle: { color: '#ff5722', fontSize: 14 },
        titleTextStyle: { color: '#ffffff', fontSize: 16 },
      },
      vAxis: {
        title: 'Valor',
        textStyle: { color: '#ff5722', fontSize: 14 },
        titleTextStyle: { color: '#ffffff', fontSize: 16 },
      },
      series: {
        0: { color: '#ff5722' },
        1: { color: '#8205FF' },
      },
      titleTextStyle: {
        color: '#ffffff',
        fontSize: 20,
        bold: true,
      },
      chartArea: {
        width: '90%',
        height: '70%',
      },
    };

    const categories = [
      'Alimentação',
      'Saúde',
      'Lazer',
      'Trabalho',
      'Transporte',
    ];

    const data = [
      ['Categoria', 'Total'],
      ...categories.map((category) => [
        category,
        this.getTotalByTag(category, expenses),
      ]),
    ];
    return (
      <main className="bg-black h-full w-full overflow-hidden overflow-y-auto flex flex-col p-4 items-center scrollClass">
        <Header />
        <section className="w-full flex flex-col text-primary md:flex-row p-6">
          <WalletForm />
          <Table />
        </section>
        <section className="w-full h-full">
          <ChartComponent
            chartType="ColumnChart"
            width="100%"
            data={data}
            options={options}
          />
        </section>
      </main>
    );
  }
}

Wallet.propTypes = {
  expenses: PropTypes.arrayOf,
}.IsRequired;

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
