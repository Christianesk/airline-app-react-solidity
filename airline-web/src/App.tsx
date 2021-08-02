import React from 'react';
import Panel from './components/Panel'
import { useAppState } from "./containers/useAppState";

function App() {

  const { account,balance } = useAppState();


  return (
    <div className="container">
      <div className="jumbotron pt-5">
        <h4 className="display-4">Welcome to the Airline!</h4>
      </div>

      <div className="row pt-5">
        <div className="col-sm">
          <Panel title="Balance" children={account} aditionaChildren={balance}></Panel>
        </div>
        <div className="col-sm">
          <Panel title="Loyalty points - refundable ether" children="" />
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-sm">
          <Panel title="Available flights" children="" />
        </div>
        <div className="col-sm">
          <Panel title="Your flights" children="" />
        </div>
      </div>
    </div>
  );
}

export default App;
