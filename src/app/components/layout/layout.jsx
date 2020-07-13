import React from "react";
import {LeftSidebar} from "./left-sidebar/left-sidebar";
import {Header} from "./header/header";
import {IOSMobileLayout} from "./ios-mobile-menu/ios-mobile-layout";
import {AndroidMobileLayout} from "./android-mobile-layout/android-mobile-layout";
import {getMobileOperatingSystem} from "../../common/operating-system";
import {responsive} from "../../common/responsive";
export class Layout extends React.Component {

    constructor(props) {
        super(props);

        responsive.onChange(() => {
            this.forceUpdate();
        })
    }


    render() {

        let {history, children} = this.props;
        let isMobile = responsive.le("xs");
        if (isMobile) {
            const mobileComponents = {
                "Android": AndroidMobileLayout,
                "iOS": IOSMobileLayout
            };

            const os = getMobileOperatingSystem();
            const View = mobileComponents[os];

            return (
                <View
                    history={history}
                    children={children}
                />
            )
        }

        return (
            <div className="layout">
                <Header/>

                <div className="menu-item">
                    <LeftSidebar
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
