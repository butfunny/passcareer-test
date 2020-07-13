import React from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";
import {Header} from "../header/header";
export class IOSMobileLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        if (window.innerWidth <= 1024) {
            let lastScrollTop = 0;
            let startScrollTopPos = null;
            let $container = $(".header");

            $(window).scroll(function() {
                let st = $(this).scrollTop();

                if (st == 0) {
                    $container.removeClass("fixed");
                    $container.removeClass("show-header");
                    startScrollTopPos = null;
                }

                if (st > 80) {
                    $container.addClass("transition");
                } else {
                    $container.removeClass("transition");
                }

                if (st >= 65) {

                    $container.addClass("fixed");
                    if (startScrollTopPos && startScrollTopPos < 65) startScrollTopPos = 65;

                    if (startScrollTopPos && startScrollTopPos - st >= 10) {
                        startScrollTopPos = st;
                        $container.addClass("show-header");
                        return;
                    }

                    if (startScrollTopPos && st - startScrollTopPos > 10) {
                        $container.removeClass("show-header");
                        startScrollTopPos = null;
                        return;
                    }


                    if (st <= lastScrollTop && !startScrollTopPos) {
                        startScrollTopPos = st;
                        return;
                    }
                }


                lastScrollTop = st;
            });
        }
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
