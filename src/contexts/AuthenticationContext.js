import React from "react";

const AuthenticationContext = React.createContext(
    {
        accessToken: null,
        onLogout: null,
        onLoginAttempt: () => {}
    }
);

export default AuthenticationContext;