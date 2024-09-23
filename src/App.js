import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <div className="h-screen w-full">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/carteira" component={Wallet} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
