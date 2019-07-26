import React from 'react'
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import './SignUp.css'
import axios from 'axios'

class SignUp extends React.Component {

    state = {
        email:"",
        password:"",
        confirmPass:"",
        firstName:"",
        lastName:""
    }

    validateForm = () => {
        return (!(this.state.email === "" && this.state.password === "") &&
                (this.state.password===this.state.confirmPass));
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/auth/register', {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthDate: "1998-05-06"
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
                    <FormGroup controlId="confirmPass" bssize="large">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl 
                            type="password"
                            value={this.state.confirmPass}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="firstName" bssize="large">
                        <FormLabel>First Name</FormLabel>
                        <FormControl 
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName" bssize="large">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl 
                            type="text"
                            value={this.state.lastName}
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

export default SignUp;