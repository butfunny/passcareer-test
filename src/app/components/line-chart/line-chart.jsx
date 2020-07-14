import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import {MouseTooltip} from "../mouse-tooltip/mouse-tooltip";
import {upperCaseFirstLetter} from "../../common/common";
import moment from "moment";
import classnames from "classnames";
export class LineChart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            width: null,
            displayDate: null,
            clientX: null
        };
    }

    componentDidMount() {
        this.setState({clientX: ReactDOM.findDOMNode(this).getBoundingClientRect().x});

        $(window).on("scroll", () => {
            this.setState({displayDate: null})
        })
    }

    componentWillUnmount() {
        $(window).off("scroll")
    }




    render() {


        let {chartWidth, data, hiddenField} = this.props;
        if (!chartWidth || !data) return <div>&nbsp;</div>;

        let {displayDate, clientX} = this.state;

        const svgWidth = chartWidth,
            svgHeight = 152;

        const margin = { top: 20, right: 30, bottom: 30, left: 30 },
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;


        const x = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            z = d3.scaleOrdinal().range(["#27c195", "#f55173"]);

        const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value));


        x.domain(d3.extent(data[0].values, d => d.date));

        y.domain([
            0,
            d3.max(data, c => d3.max(c.values, d => d.value)),
        ]);

        z.domain(data.map(c => c.id));


        const renderToolTip = () => {

            if (!displayDate) return null;

            let found = {};
            for (let analyticsData of data) {
                found[analyticsData.id] = analyticsData.values.find(d => d.date.getTime() == displayDate.getTime()).value
            }

            const fields = ["income", "outcome"];

            return (
                <div className="tooltip-statistic">
                    <div className="time">
                        {moment(displayDate).format("MMMM Do YYYY")}
                    </div>

                    { fields.filter(f => hiddenField.indexOf(f) == -1).map((field, index) => (
                        <div className="item-display" key={index}>
                            <span className={classnames("circle", field)}/>
                            {field == "income" ? "+" : "-"} ${found[field]}
                        </div>
                    ))}
                </div>
            )
        };


        return (
            <svg width={svgWidth} height={svgHeight}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <g
                        className="axis axis--x"
                        transform={`translate(0, ${height + 10})`}
                        ref={node => d3.select(node).call(d3.axisBottom(x).ticks(5))}
                    />
                    <g className="axis axis--y" ref={node => d3.select(node).call(d3.axisLeft(y).ticks(3, "f").tickFormat(d => `${d % 1 === 0 ? d : ""}`))}/>

                    <g className="grid"
                       ref={node => d3.select(node).call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(""))}
                    />

                    { displayDate && (
                        <rect
                            x={x(displayDate)}
                            y={0}
                            height={height}
                            width={1}
                            fill="#dedede"
                        />
                    )}

                    { data.map(item => {
                        return (
                            <g className="city" key={item.id}>
                                <Path
                                    className="line"
                                    d={line(item.values)}
                                    style={{stroke: z(item.id), opacity: hiddenField.indexOf(item.id) > -1 ? 0 : 1}}
                                />
                            </g>
                        );
                    })}
                </g>

                <MouseTooltip
                    tooltip={renderToolTip()}
                    hasArrow
                    hideTooltip={displayDate == null}
                >
                    <rect
                        transform={`translate(${margin.left},${margin.top})`}
                        className="overlay"
                        width={width}
                        height={height}
                        onMouseLeave={() => this.setState({displayDate: null})}
                        onMouseMove={(e) => {
                            let x0 = x.invert(e.clientX - clientX - margin.left).getTime();
                            let min = Infinity;
                            let selectedDate = null;

                            for (let d of data[0].values) {
                                if (Math.abs(new Date(x0).getTime() - d.date.getTime()) < min) {
                                    min = Math.abs(new Date(x0).getTime() - d.date.getTime());
                                    selectedDate = d.date
                                }
                            }
                            this.setState({displayDate: selectedDate})


                        }}
                    />
                </MouseTooltip>


            </svg>
        );
    }
}

class Path extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            totalLength: 0
        }
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        this.setState({totalLength: node.getTotalLength()})
    }

    render() {

        let {className, d, style} = this.props;
        let {totalLength} = this.state;


        return (
            <path
                className={classnames(className, "line-path")}
                d={d}
                style={style}
                strokeDashoffset={totalLength}
                strokeDasharray={totalLength}
            />
        )
    }
}
