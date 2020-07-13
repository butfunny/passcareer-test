import React from "react";
import classnames from "classnames";
import {Link} from "react-router-dom";
export class LeftSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {history} = this.props;

        const topSidebarItems = [{
            iconName: "home",
            name: "Dashboard",
            to: "/"
        }, {
            iconName: "bell",
            name: "Notifications",
            to: "/notifications"
        }, {
            iconName: "cog",
            name: "Settings",
            to: "/settings"
        }];




        return (
            <div className="left-sidebar">
                <div className="sidebar-item-wrapper">

                    { topSidebarItems.map((item, index) => (
                        <Link to={item.to} className={classnames("sidebar-item", history.location.pathname == item.to && "active")} key={index}>
                            <div className="icon">
                                <i aria-hidden="true" className={`${item.iconName} big icon`}/>
                            </div>

                            <div className="tooltip">
                                <div className="tooltip-name">
                                    {item.name}
                                </div>

                                <div className="arrow"/>
                            </div>
                        </Link>
                    ))}
                </div>


                <div className="user-action">
                    <div className="sidebar-item-wrapper bottom-action">
                        <div className="sidebar-item"
                             onClick={() => alert("logout")}
                        >
                            <div className="icon">
                                <i aria-hidden="true" className="sign-out large icon"/>
                            </div>

                            <div className="tooltip">
                                <div className="tooltip-name">
                                    Logout
                                </div>

                                <div className="arrow"/>
                            </div>
                        </div>

                    </div>
                </div>





            </div>
        );
    }
}
