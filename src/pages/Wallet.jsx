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

    if (prevProps.expenses !== expenses) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }

  render() {
    return (
      <main className="bg-black h-full w-full overflow-hidden overflow-y-auto flex flex-col p-4 items-center scrollClass">
        <Header />
        <section className="w-full flex flex-col text-primary md:flex-row p-6">
          <WalletForm />
          <Table />
        </section>
        <section>
          <ChartComponent />
        </section>
      </main>
    );
  }
}

Wallet.propTypes = {
  expenses: PropTypes.arrayOf
}.IsRequired;

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);