import React from "react";
export class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <img className="logo-image" src="/assets/img/logo.png" alt=""/>

                <div className="input-search">
                    <div className="icon">
                        <i aria-hidden="true" className={`search small icon`}/>
                    </div>

                    <input
                        className="input-control"
                        placeholder="Search"
                    />
                </div>

                <div className="user-profile">
                    <img className="avatar" src="/assets/img/avatar.jpg" alt=""/>

                    <div className="user-name">
                        Alexander P
                    </div>

                    <div className="job-title">
                        Business Profile
                    </div>
                </div>
            </div>
        );
    }
}
