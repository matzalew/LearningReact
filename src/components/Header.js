import React from "react";
import UserGreeting from "./UserGreeting"
import AuthenticationContext from "../contexts/AuthenticationContext"

function Header(props) {
    return (
      <AuthenticationContext.Consumer>
        {
          ({ onLogout }) => {
            return (
              <header className="header">
                <UserGreeting />
                <a onClick={onLogout} className="header__logout-link" href="#">Wyloguj się</a>
              </header>
            )
          }
        }
      </AuthenticationContext.Consumer>
    );
  }
export default Header;