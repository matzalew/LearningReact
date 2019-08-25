import React from "react"

import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import Header from "./Header";
import Quote from "./Quote";

function AuthenticatedApp(props) {
    return (
        <React.Fragment>
            <Header /> 
            <TimeboxList  />
            <EditableTimebox />
            <Quote />
        </React.Fragment>
    );
}

export default AuthenticatedApp;