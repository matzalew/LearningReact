import React from "react";

import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationAPI from "../api/FetchAuthenticationApi";
import jwt from "jsonwebtoken";

class App extends React.Component {
    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn() {
        return !!this.state.accessToken;
    }

    getUserEmail() {
        const decodedToken = jwt.decode(this.state.accessToken);
        return decodedToken.email;
    }

    handleLoginAttempt = (credentials) => {
        AuthenticationAPI.login(credentials)
            .then( ({ accessToken }) => {
                this.setState({
                    accessToken,
                    previousLoginAttemptFailed: false
                })
            }).catch( () => {
                this.setState({
                    previousLoginAttemptFailed: true
                })
            })
    }

    handleLogout = () => {
        this.setState({
            accessToken: null,
            previousLoginAttemptFailed: false
        })
    }

    render() {
        return (
            <div className="App">
                <ErrorBoundary message="Coś nie działa w całej aplikacji">
                    {
                        this.isUserLoggedIn() ?
                        <>
                            <header className="header">
                                Witaj {this.getUserEmail()}
                                <a onClick={this.handleLogout}className="header__logout-link" href="#">Wyloguj się</a>
                            </header>
                            <TimeboxList />
                            <EditableTimebox />
                        </> :
                        <LoginForm 
                            errorMessage={ this.state.previousLoginAttemptFailed ? "Nie udało się zalogować" : null} 
                            onLoginAttempt={this.handleLoginAttempt}    
                        />
                    }
                    
                </ErrorBoundary>
            </div>
        )
    }
}

export default App