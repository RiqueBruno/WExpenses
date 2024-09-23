import React from 'react';
import Header from '../components/Header/Header';
import WalletForm from '../components/WalletForm/WalletForm';
import Table from '../components/Table/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="w-full">
          <WalletForm />
          <Table />
        </div>
      </>
    );
  }
}

export default Wallet;
