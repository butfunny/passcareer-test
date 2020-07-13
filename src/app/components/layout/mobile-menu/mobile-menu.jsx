import React from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";
export class MobileMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {


        let {history} = this.props;


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
            <div className="mobile-menu">
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
        );
    }
}
