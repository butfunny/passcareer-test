import React from "react";
import {Layout} from "../../components/layout/layout";
export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <div className="dashboard">
                    <button className="ui primary button">Primary</button>
                </div>
            </Layout>
        );
    }
}
