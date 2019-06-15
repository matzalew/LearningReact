import React from "react";

import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox"


function App() {
    return (
        <div className="App">
            <EditableTimebox />
             
            <TimeboxList />
            
        </div>
    )
}

export default App;