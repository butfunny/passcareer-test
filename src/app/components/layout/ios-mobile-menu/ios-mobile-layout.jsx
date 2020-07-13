import React from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";
import {Header} from "../header/header";
import {headerControl} from "../../../common/header-control";
export class IOSMobileLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let $container = $(".header");
        this.headerControl = headerControl($container);
        this.headerControl.startControl();
    }

    componentWillUnmount() {
        this.headerControl.stopControl();
    }


    render() {


        let {history, children} = this.props;


        const menuItems = [{
            iconName: "home",
            to: "/"
        }, {
            iconName: "bell",
            to: "/notifications"
        }, {
            iconName: "cog",
            to: "/settings"
        }, {
            iconName: "bars",
            name: "More",
            to: "/more"
        }];

        return (
            <div className="ios-mobile-menu">

                <div className="ios-menu-header">
                    <Header/>
                </div>

                <div className="nav-items">
                    {menuItems.map((item, index) => (
                        <Link to={item.to} className={classnames("mobile-menu-item", history.location.pathname == item.to && "active")} key={index}>
                            <i aria-hidden="true" className={`${item.iconName} big icon`}/>
                        </Link>
                    ))}

                    <div className="active-line"
                         style={{
                             left: `${(menuItems.findIndex(item => history.location.pathname == item.to) * 25)}%`
                         }}
                    />
                </div>

                <div className="app-container">
                    {children}
                </div>
            </div>
        );
    }
}
