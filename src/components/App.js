import React, {useState} from "react";

import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";

import AuthenticationAPI from "../api/FetchAuthenticationApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));

function App() {
    const [accessToken, setAccessToken] = useState();
    const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed] = useState(
      false
    );

    function isUserLoggedIn() {
        return !!accessToken;
      }

    function handleLoginAttempt(credentials) {
        AuthenticationAPI.login(credentials)
          .then(({ accessToken }) => {
            setAccessToken(accessToken);
            setPreviousLoginAttemptFailed(false);
          })
          .catch(() => {
            setPreviousLoginAttemptFailed(true);
          });
      }

    function handleLogout() {
        setAccessToken(null);
        setPreviousLoginAttemptFailed(false);
      }


    return (
        <div className="App">
             <AuthenticationContext.Provider
                value={ {
                    accessToken: accessToken,
                    onLogout: handleLogout,
                    onLoginAttempt: handleLoginAttempt
                } }
            >
                <ErrorBoundary message="Coś nie działa w całej aplikacji">
                    {
                        isUserLoggedIn() ?
                            <React.Suspense fallback="Loading...">
                                <AuthenticatedApp />
                            </React.Suspense>
                        :
                            <LoginForm 
                                errorMessage={previousLoginAttemptFailed ? "Nie udało się zalogować" : null} 
                                onLoginAttempt={handleLoginAttempt}    
                            />
                    }
                        
                </ErrorBoundary>
            </AuthenticationContext.Provider>
        </div>
    )
    
}

export default App