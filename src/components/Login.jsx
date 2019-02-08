import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isError: false,
            signIn: false,
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleLogin = () => {
        let self = this;
        axios.post('https://players-api.developer.alchemy.codes/api/login', {
        "email": self.state.email,
        "password": self.state.password,
      })
      .then(function (response) {
          console.log(response.data);
        self.props.history.push({
            pathname: '/roster/',
            state: {
                email: self.state.email,
                user: response.data.user,
                token: response.data.token,
                signIn: true,
                isError: false
            }
        });

      })
      .catch(function (error) {
        if(error) {
            self.setState({
                isError: true
            })
        }
        //console.log(error);
      });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return(
        <div className="login-page">
          <div className={`p-3 mb-2 bg-danger text-white ${this.state.isError ? 'visible' : 'invisible'}`}>Error logging in</div>
          <div className="form">
              <input type="text" name="email" placeholder="username" value={this.state.email} onChange={this.handleChange}/>
              <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
              <button onClick={this.handleLogin}>login</button>
              <p className="message">Not registered? <Link to="/register/">Create an account</Link></p>
          </div>
        </div>
        )
    }
}
export default Login;
