import React from 'react';
import Header from '../components/Header/Header';
import WalletForm from '../components/WalletForm/WalletForm';
import Table from '../components/Table/Table';

class Wallet extends React.Component {
  render() {
    return (
      <main className="bg-black h-full w-full overflow-hidden overflow-y-auto flex flex-col p-4 items-center">
        <Header />
        <section className="w-full flex flex-col text-primary md:flex-row">
          <WalletForm />
          <Table />
        </section>
      </main>
    );
  }
}

export default Wallet;
