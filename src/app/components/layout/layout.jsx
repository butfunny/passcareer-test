import React from "react";
import {LeftSidebar} from "./left-sidebar/left-sidebar";
import {Header} from "./header/header";
import {MobileMenu} from "./mobile-menu/mobile-menu";
export class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {history} = this.props;

        return (
            <div className="layout">

                <Header/>

                <div className="menu-item">
                    {/*<LeftSidebar*/}
                    {/*    history={history}*/}
                    {/*/>*/}
                    <MobileMenu
                        history={history}
                    />
                </div>

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
