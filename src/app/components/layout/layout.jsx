import React from "react";
import {LeftSidebar} from "./left-sidebar/left-sidebar";
import {Header} from "./header/header";
export class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layout">

                <Header/>

                <div className="menu-item">
                    <LeftSidebar/>
                </div>

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
