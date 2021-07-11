import React from "react";

export interface IPanelProps {
    title: string;
    children: string;
}

const Panel = (props: IPanelProps) => {
    return (
        <React.Fragment>
            <div className="card">
                <h5 className="card-header bg-info text-white">{props.title}</h5>
                <div className="card-body">
                    <div className="card-text">{props.children}</div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Panel;