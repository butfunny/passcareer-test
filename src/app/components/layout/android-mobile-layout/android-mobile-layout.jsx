import React from "react";
import {Header} from "../header/header";
import {Link} from "react-router-dom";
import classnames from "classnames";
import {menuItems} from "../ios-mobile-menu/ios-mobile-layout";
import {headerControl} from "../../../common/header-control";
export class AndroidMobileLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let $container = $(".android-mobile-header");
        this.headerControl = headerControl($container);
        this.headerControl.startControl();
    }

    componentWillUnmount() {
        this.headerControl.stopControl();
    }


    render() {

        let {history, children} = this.props;

        return (
            <div className="android-mobile-layout">
                <div className="android-mobile-header">
                    <Header/>

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
                </div>



                <div className="app-container">
                    {children}
                </div>
            </div>
        );
    }
}
