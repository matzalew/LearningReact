import React from "react";

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

export default TimeboxCreator;