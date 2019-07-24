import React from 'react'
import './Navbar.css'

import Logo from './Logo/Logo'

class Navbar extends React.Component {

    state = {
        authenticated: false
    }

    signInHandler = () => {
        this.setState({authenticated: true});
    }

    signUpHandler = () => {
        alert("coming soon");
    }

    logOutHandler = () => {
        this.setState({authenticated: false});
    }

    render() {

        let rightSide = null;

        if (this.state.authenticated) {
            rightSide = (
                <button onClick={this.logOutHandler}>Log out!</button>
            )
        } else {
            rightSide = (
                <div>
                    <button onClick={this.signInHandler}>Sign In</button>
                    <button onClick={this.signUpHandler}>Sign Up</button>
                </div>    
            )
        }
        
        return(
            <div className="Navbar">
                <Logo />
                {rightSide}
            </div>
        );
        
    }

}

export default Navbar;