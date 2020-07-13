import React from "react";
import classnames from "classnames";
export class LeftSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const topSidebarItems = [{
            iconName: "home",
            name: "Dashboard"
        }, {
            iconName: "bell",
            name: "Notifications"
        }, {
            iconName: "cog",
            name: "Settings"
        }];



        return (
            <div className="left-sidebar">
                <div className="sidebar-item-wrapper">

                    { topSidebarItems.map((item, index) => (
                        <div className={classnames("sidebar-item", index == 0 && "active")} key={index}>
                            <div className="icon">
                                <i aria-hidden="true" className={`${item.iconName} big icon`}/>
                            </div>

                            <div className="tooltip">
                                <div className="tooltip-name">
                                    {item.name}
                                </div>

                                <div className="arrow"/>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="user-action">
                    <div className="sidebar-item-wrapper bottom-action">
                        <div className="sidebar-item">
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
