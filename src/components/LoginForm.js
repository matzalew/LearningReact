import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.loginForm = React.createRef();
    }
    loginForm = (event) => {
        event.preventDefault(); 
        this.props.onLoginAttempt({ 
            email: this.emailInput.current.value, 
            password: this.passwordInput.current.value
        });
        this.emailInput.current.value = "";
        this.passwordInput.current.value = "";
    }

    render() {
        return (
            <form onSubmit={this.loginForm} className="LoginForm">
                { this.props.errorMessage ? 
                    <div className="LoginForm__error-message">{this.props.errorMessage}</div> :
                    null
                }
                <label>
                    Email
                    <input 
                        ref={this.emailInput}
                        type="text" 
                        defaultValue="bob@example.com"
                    />
                </label><br/>
                <label>
                    Hasło
                    <input 
                        ref={this.passwordInput}
                        type="password" 
                        defaultValue="secret"
                    />
                </label><br />
                <button 
                >Zaloguj się</button>
            </form>
        )
    }
}

export default LoginForm;