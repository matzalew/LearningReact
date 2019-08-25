import React from "react"

import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import Header from "./Header";

function AuthenticatedApp(props) {
    return (
        <React.Fragment>
            <Header /> 
            <TimeboxList  />
            <EditableTimebox />
        </React.Fragment>
    );
}

export default AuthenticatedApp;