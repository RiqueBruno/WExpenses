import React from 'react';
import Header from '../components/Header/Header';
import WalletForm from '../components/WalletForm/WalletForm';
import Table from '../components/Table/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div className="divMain">
          <Header />
          <div className="divMainHeader">
            <WalletForm />
          </div>
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
