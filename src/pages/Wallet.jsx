import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table/Table';
import './CSS/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div className="divBlur" />
        <div className="divMain">
          <div className="divMainHeader">
            <Header />
            <WalletForm />
          </div>
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
