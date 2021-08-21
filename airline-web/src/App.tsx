import React from 'react';
import PanelBalance from './components/PanelBalance/PanelBalance';
import PanelFlights from './components/PanelFlights/PanelFlights';
import PanelLoyaltyPoints from './components/PanelLoyaltyPoints/PanelLoyaltyPoints';
import { useAppState } from "./containers/useAppState";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const {
    account,
    balance,
    flights,
    buyFlight,
    customerFlights,
    refundableEther,
    redeemLoyaltyPoints
  } = useAppState();

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
          <PanelLoyaltyPoints title="Loyalty points - refundable ether" children={refundableEther} redeemLoyaltyPoints={redeemLoyaltyPoints} />
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
      <ToastContainer />
    </div>
  );
}

export default App;
