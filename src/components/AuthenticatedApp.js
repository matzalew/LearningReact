import React from "react"

import EditableTimebox from "./EditableTimebox";
import TimeboxManager from "./TimeboxManager";
import Header from "./Header";
import Quote from "./Quote";

function AuthenticatedApp(props) {
    return (
        <React.Fragment>
            <Header /> 
            <TimeboxManager  />
            <EditableTimebox />
            <Quote />
        </React.Fragment>
    );
}

export default AuthenticatedApp;