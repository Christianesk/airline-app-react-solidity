import React from "react";
import { IFlight } from "../../containers/useAppState";

export interface IPanelFlightsProps {
    flights: IFlight[];
    buyFlight: (flightIndex: Number, value: string) => Promise<any>;
    buttonBuy: boolean;
}

const PanelFligts = (props: IPanelFlightsProps): JSX.Element => {
    return (
        <div className="card-body">
            <div className="card-text">
                {
                    props.flights.map((flight: IFlight, i: number) => {
                        return (<div key={i} className="mt-2">
                            <span>{flight.name} - cost: {flight.price}</span>
                            {props.buttonBuy && (
                                <button onClick={() => props.buyFlight(i, flight.price)} className=" mx-5 btn btn-sm btn-primary text-white">Pucharse</button>
                            )}
                        </div>);
                    })
                }
            </div>
        </div>
    );
}

export default PanelFligts;