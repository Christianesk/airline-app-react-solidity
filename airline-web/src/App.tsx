import React from 'react';
import Panel from './components/Panel'
import { IFlight, useAppState } from "./containers/useAppState";

function App() {

  const { account, balance, flights } = useAppState();


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
          <div className="card">
            <h5 className="card-header bg-info text-white">Available flights</h5>
            <div className="card-body">
              <div className="card-text">
                {
                  flights.map((flight: IFlight, i) => {
                    return (<div key={i}>
                      <span>{flight.name} - cost: {flight.price}</span>
                    </div>);
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <Panel title="Your flights" children="" />
        </div>
      </div>
    </div>
  );
}

export default App;
