import React from 'react'
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import './SignIn.css'
import axios from 'axios'

class SignIn extends React.Component {

    state = {
        email:"",
        password:""
    }

    validateForm = () => {
        return !(this.state.email === "" && this.state.password === "");
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/auth/login', {
            email: this.state.email,
            password: this.state.password
          })
          .then( (response) => {
            console.log(response);
          })
          .catch( (error) => {
            console.log(error);
          });
    }

    render(){
        return(
            <div className="SignIn">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bssize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl 
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bssize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl 
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button 
                        block
                        bssize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        );
    }

}

export default SignIn;