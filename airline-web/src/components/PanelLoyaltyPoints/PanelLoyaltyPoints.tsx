import React from "react";

export interface IPanelLoyaltyPointsProps {
    title: string;
    children: string;
    redeemLoyaltyPoints: () => Promise<any>;
}

const PanelLoyaltyPoints = (props: IPanelLoyaltyPointsProps): JSX.Element => {
    return (
        <div className="card">
            <h5 className="card-header bg-info text-white">{props.title}</h5>
            <div className="card-body">
                <div className="card-text">
                    <span>{props.children} eth</span>
                    <button onClick={() => props.redeemLoyaltyPoints()} className=" mx-5 btn btn-sm btn-primary text-white">Refund</button>
                </div>
            </div>
        </div>
    );
}

export default PanelLoyaltyPoints;