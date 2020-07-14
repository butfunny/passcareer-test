import React from "react";
import {Layout} from "../../components/layout/layout";
import {DashboardTransactions} from "./transactions/dashboard-transactions";
import {SendMoneyViaPhone} from "./send-money-via-phone/send-money-via-phone";
import {DashboardMoneyBox} from "./money-box/dashboard-money-box";
export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const transactions = [{
            name: "Uber Eat",
            money: 45,
            income: false
        }, {
            name: "Telecom Services",
            money: 157,
            income: false
        }, {
            name: "Mobile Phone Recharge",
            money: 10,
            income: false
        }, {
            name: "Mobile Phone Recharge",
            money: 10,
            income: true
        }, {
            name: "Mobile Phone Recharge",
            money: 10,
            income: false
        }, {
            name: "Mobile Phone Recharge",
            money: 10,
            income: false
        }, {
            name: "Mobile Phone Recharge",
            money: 10,
            income: false
        }, {
            name: "Mobile Phone Recharge",
            money: 10,
            income: false
        }, {
            name: "Mobile Phone Recharge",
            money: 10,
            income: false
        }, {
            name: "Mobile Phone Recharge",
            money: 10,
            income: false
        }];

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
                        <SendMoneyViaPhone/>

                        <DashboardMoneyBox/>
                    </div>
                </div>
            </div>
        );
    }
}
