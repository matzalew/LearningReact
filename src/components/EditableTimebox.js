import React, {useState} from "react";

import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

function EditableTimebox() {
    const [title, setTitle] = useState("Uczę się hook");
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(2);
    const [isEditable, setIsEditable] = useState(false);

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleTotalTimeInMinutesChange(event) {
        setTotalTimeInMinutes(event.target.value);
    }

    function handleConfirm() {
        setIsEditable(false);
    }
      
    function handleEdit() {
        setIsEditable(true);
    }

    return (
        <React.Fragment>
            <React.StrictMode>
            {isEditable ? (
                <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onConfirm={handleConfirm}
                    onTitleChange={handleTitleChange} 
                    onTotalTimeInMinutesChange={handleTotalTimeInMinutesChange}
                />
            ):(
            <CurrentTimebox 
                isEditable={isEditable}
                title={title} 
                totalTimeInMinutes={totalTimeInMinutes}
                onEdit={handleEdit} 
            />
            )}
            </React.StrictMode>
        </React.Fragment>
    )
    
}

export default EditableTimebox;