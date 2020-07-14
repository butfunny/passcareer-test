import React from "react";
import momment from "moment";
import classnames from "classnames";
export class DashboardTransactions extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {transactions} = this.props;

        return (
            <div className="dashboard-card-item dashboard-transactions">
                <div className="card-title">
                    Transactions
                </div>

                <div className="card-container">
                    {transactions.map((transaction, index) => (
                        <div className="transaction" key={index}>
                            <div className="transaction-title">
                                <div className="transaction-name">
                                    {transaction.name}
                                </div>

                                <div className="transaction-date">
                                    {momment(new Date()).format("MM/DD/YY hh:mm")}
                                </div>
                            </div>

                            <div className={classnames("transaction-money", transaction.income ? "income" : "outcome")}>
                                {transaction.income ? "+" : "-"} ${transaction.money}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
