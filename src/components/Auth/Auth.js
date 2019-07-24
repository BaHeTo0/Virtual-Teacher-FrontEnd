import React from 'react'

import Input from './../UI/Input/Input'

class Auth extends React.Component {

    state = {
        controls: {}
    }

    render() {

        let form = (
            <form>
                <Input inputtype="input" type="email" name="email" placeholder="Email" />
                <Input inputtype="input" type="password" name="password" placeholder="Password" />
            </form>
            );

        return(
            <div className="Auth">
                {form}
            </div>
        );
    }

}

export default Auth;