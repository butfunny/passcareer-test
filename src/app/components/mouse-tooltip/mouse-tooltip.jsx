import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

export class MouseTooltipRegistry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltip: null,
            position: null,
            x: null,
            y: null,
            hasArrow: false
        };

        mouseTooltip.show = ({tooltip, position, tooltipClassName, tooltipStyle, hasArrow}) => {
            this.setState({tooltip, position, tooltipClassName, tooltipStyle, hasArrow});
            return () => {
                this.setState({tooltip: null})
            };
        };

        mouseTooltip.hide = () => {
            this.setState({tooltip: null});
        }
    }

    componentDidUpdate() {
        if (this.state.tooltip != null) {
            if (this.cancelFollowMouse == null) {
                this.cancelFollowMouse = this.followMouse();
            }
        } else {
            if (this.cancelFollowMouse != null) {
                this.cancelFollowMouse();
                this.cancelFollowMouse = null;
            }
        }
    }

    cancelFollowMouse = null;

    followMouse() {
        const followFunc = (e) => {
            this.setState({
                x: e.clientX,
                y: e.clientY,
            });
        };
        $(window).on("mousemove", followFunc);
        return () => $(window).off("mousemove", followFunc);
    }

    render() {
        const {className} = this.props;
        let {x, y, tooltip, position, tooltipClassName, tooltipStyle, hasArrow} = this.state;


        position = (window.innerWidth - this.state.x < 150) ? "left" : (position || "right");

        let tooltipBoxStyle = {};

        if (position == "right") {
            tooltipBoxStyle = Object.assign({}, {
                left: x + 20,
                top: y,
                transform: 'translateY(-50%)',
            }, tooltipStyle ? tooltipStyle : ``);
        } else if (position == "left") {
            tooltipBoxStyle = Object.assign({}, {
                right: window.innerWidth - x + 20,
                top: y - 10,
            }, tooltipStyle ? tooltipStyle : ``);
        } else if (position == "top") {
            tooltipBoxStyle = Object.assign({}, {
                left: x,
                bottom: window.innerHeight - y + 10,
                transform: 'translateX(-50%)',
            }, tooltipStyle ? tooltipStyle : ``);
        } else if (position == "bottom") {
            tooltipBoxStyle = Object.assign({}, {
                left: x,
                top: y + 20,
                transform: 'translateX(-50%)',
            }, tooltipStyle ? tooltipStyle : ``);
        }

        return (
            <div className={classnames("mouse-tooltip-registry", className)}>
                {tooltip && (
                    <div className={classnames("mouse-tooltip-box", position, tooltipClassName, {
                        "has-arrow": hasArrow
                    })}
                         style={tooltipBoxStyle}>
                        {typeof tooltip == "function" ? tooltip() : tooltip}
                    </div>
                )}
            </div>
        );
    }
}

export const mouseTooltip = {
    show: null
};

export class MouseTooltip extends React.Component {
    clearF;

    constructor(props) {
        super(props);

        this.state = {
            isMouseOver: false
        }
    }

    clear() {
        this.setState({isMouseOver: false});
        if (this.clearF) {
            this.clearF();
            this.clearF = null;
        }
    }

    elem = null;

    componentDidMount() {
        const {position, tooltip, tooltipClassName, hideTooltip, tooltipStyle, hasArrow} = this.props;
        this.elem = $(ReactDOM.findDOMNode(this));
        this.elem.mouseover(() => {
            this.setState({isMouseOver: true});
            if (!hideTooltip) {
                this.clearF = mouseTooltip.show({position, tooltip, tooltipClassName, tooltipStyle, hasArrow})
            }
        });
        this.elem.mouseout(() => this.clear());
    }

    componentWillUnmount() {
        this.clear();
        this.elem.off('mouseover');
        this.elem.off('mouseout');
    }

    componentWillReceiveProps({position, tooltip, tooltipClassName, hideTooltip, tooltipStyle, hasArrow}) {

        if (!hideTooltip) {
            mouseTooltip.show({position, tooltip, tooltipClassName, tooltipStyle, hasArrow});
        }

        if (hideTooltip) {
            mouseTooltip.hide();
        }
    }

    render() {
        return this.props.children;
    }
}
