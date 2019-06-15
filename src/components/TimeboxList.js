import React from "react";
import uuid from "uuid";

import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { title: "Uczę się 1", totalTimeInMinutes: "25" },
            { title: "Uczę się 2", totalTimeInMinutes: "4" },
            { title: "Uczę się 3", totalTimeInMinutes: "120" },
        ]
    }

    modifyTimeboxes(indexToModify, numOfItemsToModify, newOrUpdatedTimebox) {
        this.setState(prevState => {
            const timeboxes = [...prevState.timeboxes];
            timeboxes.splice(...arguments);
            return { timeboxes };
        })
    }

    handleCreate(newTimebox) {
        this.modifyTimeboxes(0, 0, newTimebox)
    }

    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate.bind(this)} />
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox
                        key={uuid.v4()}
                        title={timebox.title}
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete={() => this.modifyTimeboxes(index, 1)}
                        onUpdate={(updatedTimebox) => this.modifyTimeboxes(index, 1, updatedTimebox)}
                    />
                ))}
            </>
        )
    }
}

export default TimeboxList;