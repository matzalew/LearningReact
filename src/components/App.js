import React from "react";

import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticatedApp from "./AuthenticatedApp";

import AuthenticationAPI from "../api/FetchAuthenticationApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

class App extends React.Component {
    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn() {
        return !! this.state.accessToken;
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
                 <AuthenticationContext.Provider
                    value={ {
                        accessToken: this.state.accessToken,
                        onLogout: this.handleLogout,
                        onLoginAttempt: this.handleLoginAttempt
                    } }
                >
                    <ErrorBoundary message="Coś nie działa w całej aplikacji">
                        {
                            this.isUserLoggedIn() ?
                                <AuthenticatedApp />
                            :
                            <LoginForm 
                                errorMessage={ this.state.previousLoginAttemptFailed ? "Nie udało się zalogować" : null} 
                                onLoginAttempt={this.handleLoginAttempt}    
                            />
                        }
                        
                    </ErrorBoundary>
                </AuthenticationContext.Provider>
            </div>
        )
    }
}

export default App