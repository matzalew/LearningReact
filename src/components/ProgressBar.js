import React from "react";
import classNames from "classnames"

function ProgressBar({className = "",  percent = 0, big = false, color = null  }) {
    let progressBarClassName = classNames(
        "progress",
        className,
        {
            "progress--big" : big,
            "progress--color-red" : color === "red"
        }
    )
    
    return (
        <div className={progressBarClassName}>
            <div className="progress__bar" style={{width: `${percent}%`}}/>
        </div>
    );
}

export default ProgressBar;