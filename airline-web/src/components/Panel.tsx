import React from "react";

export interface IPanelProps {
    title: string;
    children: string;
    aditionaChildren?: string;
}

const Panel = (props: IPanelProps) => {
    return (
        <React.Fragment>
            <div className="card">
                <h5 className="card-header bg-info text-white">{props.title}</h5>
                <div className="card-body">
                    <div className="card-text">
                        <p><strong>{props.children}</strong></p>
                    </div>
                    {
                        props.aditionaChildren && (
                            <div className="card-text">
                                <span><strong>Balance:</strong> {props.aditionaChildren}</span>
                            </div>
                        )
                    }

                </div>
            </div>
        </React.Fragment>
    );
}

export default Panel;