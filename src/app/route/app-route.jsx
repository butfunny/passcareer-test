import React from "react";
import { Route, BrowserRouter, Switch, useHistory} from 'react-router-dom';
import {Layout} from "../components/layout/layout";
import {Dashboard} from "./dasboard/dashboard";
import {NotificationRoute} from "./notification/notification-route";
import {SettingsRoute} from "./settings/settings-route";


function RouterSwitch() {
    const history = useHistory();

    return (
        <Switch>
            <Layout history={history}>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/notifications" component={NotificationRoute} />
                <Route exact path="/settings" component={SettingsRoute} />
                <Route exact path="/more" component={SettingsRoute} />
            </Layout>
        </Switch>
    )
}

export class AppRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <BrowserRouter>
                <Route component={RouterSwitch}/>
            </BrowserRouter>
        );
    }
}

