import React from "react";
import {VietnamFlag} from "../../../components/icons";
export class SendMoneyViaPhone extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="send-money-via-phone dashboard-card-item">
                <div className="card-title">
                    Send Money to Mobile Phone
                </div>

                <div className="card-container">
                    <div className="input-phone-wrapper">
                        <div className="country">
                            <VietnamFlag/>
                            +84
                        </div>

                        <input className="input-phone" placeholder="000 000 0000"/>
                    </div>

                    <div className="sub-info">
                        More than 140 countries listed <i className="info circle icon"/>
                    </div>
                </div>

            </div>
        );
    }
}
