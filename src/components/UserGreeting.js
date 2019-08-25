import React from "react";
import jwt from "jsonwebtoken";
import AuthenticationContext from "../contexts/AuthenticationContext";
 

function getUserEmail(accessToken) {
    const decodedToken = jwt.decode(accessToken);
    return decodedToken.email;
}

function userGreeting(props) {
    return (
        <AuthenticationContext.Consumer>
            {
                ({accessToken}) => 
                    <React.Fragment> 
                        Hello {getUserEmail(accessToken)}
                    </React.Fragment>
            }
    </AuthenticationContext.Consumer>
    );
}

export default userGreeting;