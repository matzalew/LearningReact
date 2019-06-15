import React from "react";
import uuid from "uuid";

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

export { TimeboxList };