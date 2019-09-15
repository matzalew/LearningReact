import React from "react";

const Timebox = React.lazy(() => import("./Timebox"));

function TimeboxesList({ timeboxes, onDeleteTimebox, onUpdateTimebox}) {

  return timeboxes.map( (timebox, index) => (
      <React.Suspense fallback="Loading timeboxes">
        <Timebox
          id={timebox.id}
          title={timebox.title}
          totalTimeInMinutes={timebox.totalTimeInMinutes}
          onDelete={() => onDeleteTimebox(index)}
          onUpdate={() => onUpdateTimebox(index)}
        />
      </React.Suspense>
    )
  )
}

export default TimeboxesList; 