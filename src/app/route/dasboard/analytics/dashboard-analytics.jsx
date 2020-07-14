import React from "react";
import ReactDOM from "react-dom";
import {LineChart} from "../../../components/line-chart/line-chart";
import {analyticsHelper} from "./analytics-helper";
import {transactions} from "../transactions-data";
import {upperCaseFirstLetter} from "../../../common/common";
import classnames from "classnames";
export class DashboardAnalytics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartWidth: null,
            hiddenField: []
        }
    }

    componentDidMount() {
        let $elem = $(ReactDOM.findDOMNode(this));
        setTimeout(() => {
            this.setState({
                chartWidth: $elem.find(".card-container").width()
            })
        }, 10)
    }

    render() {

        let {chartWidth, hiddenField} = this.state;
        let {transactions} = this.props;

        return (
            <div className="dashboard-analytics dashboard-card-item">
                <div className="card-title">
                    Analytics
                </div>

                <div className="card-container">
                    <LineChart
                        chartWidth={chartWidth}
                        data={analyticsHelper.mapData(transactions)}
                        hiddenField={hiddenField}
                    />

                    <div className="description-chart">

                        {["income", "outcome"].map((field, index) => (
                            <span className={classnames("item", hiddenField.find(f => f == field) && "hidden")}
                                  key={index}
                                  onClick={() => {
                                      const found = hiddenField.find(f => f == field);
                                      if (found) this.setState({hiddenField: hiddenField.filter(f => f != field)});
                                      else this.setState({hiddenField: hiddenField.concat(field)})
                                  }}
                            >
                                    <span className={classnames("circle", field)}/>
                                {upperCaseFirstLetter(field)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
