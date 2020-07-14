import React from "react";
import {Layout} from "../../components/layout/layout";
import {DashboardTransactions} from "./transactions/dashboard-transactions";
import {SendMoneyViaPhone} from "./send-money-via-phone/send-money-via-phone";
import {DashboardMoneyBox} from "./money-box/dashboard-money-box";
import {DashboardAnalytics} from "./analytics/dashboard-analytics";
import {transactions} from "./transactions-data";
export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="dashboard-route router-container">
                <div className="router-title">
                    Dashboard

                    <div className="router-sub-title">
                        Welcome to Passcareer
                    </div>
                </div>

                <div className="dashboard-item-wrapper">
                    <div className="dashboard-item-col left-col">
                        <DashboardTransactions
                            transactions={transactions}
                        />
                    </div>

                    <div className="dashboard-item-col right-col">
                        <div className="item-row">
                            <div className="item-col-left">
                                <SendMoneyViaPhone/>
                            </div>

                            <div className="item-col-right">
                                <DashboardMoneyBox/>
                            </div>
                        </div>

                        <DashboardAnalytics
                            transactions={transactions}
                        />

                    </div>
                </div>
            </div>
        );
    }
}
