import React from "react";
import AuthenticationContext from "../contexts/AuthenticationContext"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
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
            <AuthenticationContext.Consumer>{
                ({ onLoginAttempt }) => {
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
                        defaultValue="matzalew@abc.pl"
                    />
                </label><br/>
                <label>
                    Hasło
                    <input 
                        ref={this.passwordInput}
                        type="password" 
                        defaultValue="qwerty"
                    />
                </label><br />
                <button 
                >Zaloguj się</button>
            </form>
                    )
                    }
                }
            </AuthenticationContext.Consumer>
        )
    }
}

LoginForm.contextType = AuthenticationContext;

export default LoginForm;