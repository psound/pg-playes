import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Roster from './Roster';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword:'',
            formFill: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendUser = this.sendUser.bind(this);
    }

 handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  sendUser = () => {
        let self = this;
        axios.post('https://players-api.developer.alchemy.codes/api/user', {
        "first_name": this.state.firstName,
        "last_name": this.state.lastName,
        "email": this.state.email,
        "password": this.state.password,
        "confirm_password": this.state.confirmPassword
      })
      .then(function (response) {
        console.log("self", self);
        self.props.history.push({
            pathname: '/roster/',
            state: { email: this.state.email }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

render() {
    return (
    <div className="form">
          <div className="tab-content">
            <div id="signup">
              <h1>Sign Up</h1>
              <div className="top-row">
                <div className="field-wrap">
                  <label>
                    First Name<span className="req">*</span>
                  </label>
                  <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required autoComplete="off" />
                </div>
                <div className="field-wrap">
                  <label>
                    Last Name<span className="req">*</span>
                  </label>
                  <input name="lastName" value={this.state.lastName} onChange={this.handleChange} type="text"required autoComplete="off"/>
                </div>
              </div>

              <div className="field-wrap">
                <label>
                  Email Address<span className="req">*</span>
                </label>
                <input name="email" value={this.state.email} onChange={this.handleChange} type="email"required autoComplete="off"/>
              </div>
              <div className="field-wrap">
                <label>
                  Set A Password<span className="req">*</span>
                </label>
                <input value={this.state.password} onChange={this.handleChange} name="password" type="password"required autoComplete="off"/>
              </div>
              <div className="field-wrap">
                <label>
                  confirm Password<span className="req">*</span>
                </label>
                <input value={this.state.confirmPassword} onChange={this.handleChange} name="confirmPassword" type="password"required autoComplete="off"/>
              </div>
              <button type="submit" className="button button-block" onClick={this.sendUser}>Get Started</button>
            </div>
          </div>

    </div>
)}
}
export default Register;
