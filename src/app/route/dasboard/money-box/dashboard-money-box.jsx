import React from "react";
export class DashboardMoneyBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dashboard-money-box dashboard-card-item">
                <div className="card-title">
                    Money Box
                </div>

                <div className="card-container">
                    <div className="progress">
                        <div className="progress-title">
                            Progress

                            <span className="progress-value">
                                64%
                            </span>
                        </div>

                        <div className="progress-line">
                            <div className="line-value"
                                style={{
                                    width: "64%"
                                }}
                            />
                        </div>
                    </div>

                    <div className="progress-sub-title">
                        Your money box in the process of filling
                    </div>
                </div>
            </div>
        );
    }
}
