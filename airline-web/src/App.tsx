import React from 'react';
import PanelBalance from './components/PanelBalance/PanelBalance'
import PanelFlights from './components/PanelFlights/PanelFlights'
import { useAppState } from "./containers/useAppState";

function App() {

  const { account, balance, flights, buyFlight, customerFlights } = useAppState();

  return (
    <div className="container">
      <div className="jumbotron pt-5">
        <h4 className="display-4">Welcome to the Airline!</h4>
      </div>

      <div className="row pt-5">
        <div className="col-sm">
          <PanelBalance title="Balance" children={account} aditionaChildren={balance}></PanelBalance>
        </div>
        <div className="col-sm">
          <PanelBalance title="Loyalty points - refundable ether" children="" />
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-sm">
          <div className="card">
            <h5 className="card-header bg-info text-white">Available flights</h5>
            <PanelFlights flights={flights} buyFlight={buyFlight} buttonBuy={true}></PanelFlights>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <h5 className="card-header bg-info text-white">Your flights</h5>
            <PanelFlights flights={customerFlights} buyFlight={buyFlight} buttonBuy={false}></PanelFlights>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
