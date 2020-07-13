import React from "react";
import {LeftSidebar} from "./left-sidebar/left-sidebar";
import {Header} from "./header/header";
import {IOSMobileLayout} from "./ios-mobile-menu/ios-mobile-layout";
export class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {history, children} = this.props;

        return (
            <IOSMobileLayout
                history={history}
                children={children}
            />
        )

        return (
            <div className="layout">

                <IOSMobileLayout
                    history={history}
                />

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
