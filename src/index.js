import React from "react";
import ReactDOM from "react-dom";
import uuid from "uuid";


function Clock({className = "", hours=1, minutes=10, seconds=10, miliseconds=1}) {

    const msConverter = (miliseconds) => {
        if (miliseconds>1000 || miliseconds<0) {
            return '0';
        } else if (miliseconds<10) {
            return `00${miliseconds}`
        } else if (miliseconds<100) {
            return `0${miliseconds}`
        } else{
            return miliseconds;
        }

    }
    const secConverter = (seconds) => {
            if (seconds < 0) {
               return '00';
            } else if (seconds < 10) {
               return `0${seconds}`
            }  else if (seconds >= 10 && seconds < 60) {
               return `${seconds}`
            } else if (seconds >= 60) {
               return '59'
            }
    }
    const minConverter = (minutes) => {
            if (minutes < 0) {
               return '00';
            } else if (minutes < 10) {
               return `0${minutes}`
            }  else if (minutes >= 10 && minutes < 60) {
               return `${minutes}`
            } else if (minutes >= 60) {
               return '59'
            }
    }
    const hConverter = (hours) => {
            if (hours < 0) {
               return '00';
            } else if (hours < 10) {
               return `0${hours}`
            }  else if (hours >= 10 && hours < 24) {
               return `${hours}`
            } else if (hours >= 24) {
               return '23';
            }
    }

         return <h2 className={`Clock ${className}`}>{`Pozostało ${hConverter(hours)}:${minConverter(minutes)}:${secConverter(seconds)}.${msConverter(miliseconds)}`}</h2> 
}

function ProgressBar({className = "",  percent = 0 }) {
    
    return (
        <div className={"ProgressBar " + className}>
        <div style={{width: `${100-percent}%`}}/>
        </div>
    );
}

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

class CurrentTimebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds : 0
        }
        this.handleStart = this.handleStart.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.togglePause = this.togglePause.bind(this)
    }

    stopTimer(){
        window.clearInterval(this.intervalId)
    }

    startTimer() {
        this.lastTimestamp = Date.now();

        this.intervalId = window.setInterval(() => {
            const currentTimestamp = Date.now();
            const delta = currentTimestamp - this.lastTimestamp
            this.lastTimestamp = currentTimestamp

            this.setState((prevState) => { 
                return({
                    elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + delta
                })
            })
        }, 1);
    }

    handleStart(event) {
        this.setState({
            isRunning: true
        })
        this.startTimer();
    }

    handleStop(event) {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        })
        this.stopTimer();
    }

    togglePause(){
        this.setState(
            function(prevState) {
                const isPaused = !prevState.isPaused;
                if (isPaused) {
                    this.stopTimer();
                } else {
                    this.startTimer();
                }

                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount 
                }
            }
        )
    }

    render() {
        const { isRunning, isPaused, pausesCount, elapsedTimeInSeconds } = this.state;
        const {title, totalTimeInMinutes, isEditable, onEdit} = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60*1000;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const hoursLeft = Math.floor(timeLeftInSeconds/3600000);
        const minutesLeft = Math.floor(timeLeftInSeconds%3600000/60000);
        const secondsLeft = Math.floor(timeLeftInSeconds%60000/1000);
        const milisecondsLeft = Math.floor(timeLeftInSeconds%1000)

        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds)*100.0;
        return ( 
            <div className={`Timebox  ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock hours={hoursLeft} minutes={minutesLeft} seconds={secondsLeft} miliseconds={milisecondsLeft}  className={isPaused ? "inactive" : ""}/>
                <ProgressBar percent={progressInPercent} className={isPaused ? "inactive" : ""}/>
                <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
                <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
                Liczba przerw: {pausesCount}
            </div>
            )
        }
}

class EditableTimebox extends React.Component {
    state = {
        title: "Uczymy się",
        totalTimeInMinutes: 20,
        isEditable: true
    }

    handleTitleChange = (event) =>{
        this.setState({title : event.target.value})
    }

    handleTotalTimeInMinutesChange = (event) =>{
        this.setState({totalTimeInMinutes : event.target.value})
    }

    handleConfirm = () => {
        this.setState({ isEditable: false})
    }

    handleEdit = () => {
        this.setState({ isEditable: true})
    }

    render() {
        const {title, totalTimeInMinutes, isEditable} = this.state;
        return (
            <React.Fragment>
                <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onConfirm={this.handleConfirm}
                    onTitleChange={this.handleTitleChange} 
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}/>
                <CurrentTimebox 
                    isEditable={isEditable}
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    onEdit={this.handleEdit} />
            </React.Fragment>
        )
    }
}

class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.timeboxForm = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault();
        const inputs = this.timeboxForm.current.getElementsByTagName('input');
        const title = inputs[0].value;
        const totalTimeInMinutes = inputs[1].value;
        const timebox = { title, totalTimeInMinutes };
        this.props.onCreate(timebox)
    }

    render() {
        return (
            <form ref={this.timeboxForm} className="TimeboxEditor" onSubmit={this.handleSubmit.bind(this)}>
                <label>
                    Co robisz?
                    <input
                        type="text"
                    />
                </label>
                <br />
                <label>
                    Ile minut?
                    <input
                        type="number" />
                </label>
                <br />
                <button>
                    Dodaj timebox
                </button>
            </form>
        )
    }
}


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



class Timebox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            totalTimeInMinutes: props.totalTimeInMinutes
        }
        this.confirmEdited = this.confirmEdited.bind(this)
    }
    confirmEdited() {
        const { title, totalTimeInMinutes } = this.state;
        this.props.onUpdate({...this, title, totalTimeInMinutes})
    }
    render() {
        const { onDelete } = this.props;
        const { title, totalTimeInMinutes } = this.state;
        return (
            <div className="Timebox">
                <h3>{title} - {totalTimeInMinutes} min.</h3>
                <button onClick={onDelete}>Usuń</button>
                <button onClick={this.confirmEdited}>Zmień</button>
              
                <div>
                    <label>
                        Co?
                        <input
                            className="Input--inline"
                            type="text"
                            onChange={(e) => this.setState({title: e.target.value})}
                        />
                    </label><br/>
                    <label>
                        Ile?
                        <input
                            className="Input--inline"
                            type="number"
                            onChange={(e) => this.setState({totalTimeInMinutes: e.target.value})}
                        />
                    </label>
                    
                </div>
            </div>
        )
    }
}

function App() {
    return (
        <div className="App">
            <EditableTimebox />
             
            <TimeboxList />
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));

