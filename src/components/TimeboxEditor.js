import React from "react"

function TimeboxEditor(props) {
    const { 
        title, 
        totalTimeInMinutes,
        isEditable,
        onTitleChange, 
        onTotalTimeInMinutesChange,
        onConfirm
    } = props;
    return (
        <div className={`TimeboxEditor ${isEditable?"":"inactive"}`}>
            <label> 
                Co działasz?
                 <input 
                    disabled={!isEditable}
                    value={title}
                    onChange={onTitleChange}
                    type="text"/>
                </label><br/>
                <label> 
                    Ile czasu?
                      <input 
                    disabled={!isEditable}
                    value={totalTimeInMinutes}
                    onChange={onTotalTimeInMinutesChange}
                    type="number"/>
                </label><br/>
            <button 
                onClick={onConfirm}
                disabled={!isEditable}>
                Zacznij
            </button>
        </div>
    );
}

export default TimeboxEditor