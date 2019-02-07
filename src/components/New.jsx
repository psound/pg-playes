import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class New extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.history.location.state.token,
            email: this.props.history.location.state.email,
            user: this.props.history.location.state.user,
            singIn: this.props.history.location.state.signIn,
            isError: false,
            firstName:'',
            lastName:'',
            rating: '',
            handedness: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    sendPlayer = () => {
        let self = this;
        console.log('token', self.state.token);
        axios({
        method: 'post',
        headers: {
            Authorization : `Bearer ${self.state.token}`
        },
        url: 'https://players-api.developer.alchemy.codes/api/players',
        data: {
        "first_name": self.state.firstName,
        "last_name": self.state.lastName,
        "rating": self.state.rating,
        "handedness": self.state.handedness
        }
      })
      .then(function (response) {
          console.log(response.data);
          self.props.history.push({
            pathname: '/roster/',
            state: {
                email: self.state.email,
                user: self.state.user,
                token: self.state.token,
                signIn: true
            }
        });

      })
      .catch(function (error) {
        console.log(error);
        if(error) {
            self.setState({
                isError: true
            })
        }
      });
    }

    render(){
        return(
            <div className="col-12">
                <h1>Add Payer</h1>
                <div className="col-6 text-left">
                    <h3>{this.state.user.first_name+" "+this.state.user.last_name}</h3>
                </div>
                <div className="form">
                      <div className={`p-3 mb-2 bg-danger text-white ${this.state.isError ? 'visible' : 'invisible'}`}>Opps an Error happned</div>
                      <div className="tab-content">
                        <div id="signup">
                          <h1>Player Info</h1>
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
                              <input name="lastName" value={this.state.lastName} onChange={this.handleChange} type="text" required autoComplete="off"/>
                            </div>
                          </div>

                          <div className="field-wrap">
                            <label>
                              Rating<span className="req">*</span>
                            </label>
                            <input name="rating" value={this.state.rating} onChange={this.handleChange} type="text" required autoComplete="off"/>
                          </div>
                          <div className="field-wrap">
                            <label>
                              Handedness<span className="req">*</span>
                            </label>
                            <select className="form-control" value={this.state.handedness} onChange={this.handleChange} name="handedness">
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                            </select>
                          </div>
                          <br />
                          <button type="submit" className="button button-block" onClick={this.sendPlayer}>Submit</button>
                        </div>
                      </div>
                </div>
            </div>
        )
    }

}

export default New;
