import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Roster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.history.location.state.email,
            user: this.props.history.location.state.user,
            token: this.props.history.location.state.token,
            singIn: this.props.history.location.state.signIn,
            players: []
        }
        this.addPlayer = this.addPlayer.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    componentDidMount() {
        this.getPlayers();
    }
    addPlayer = () => {
        this.props.history.push({
            pathname: '/player/new/',
            state: {
                email: this.state.email,
                user: this.state.user,
                token: this.state.token
            }
        });
    }

    getPlayers = () => {
        let self = this;
        axios({
        method: 'get',
        headers: {
            Authorization : `Bearer ${self.state.token}`
        },
        url: 'https://players-api.developer.alchemy.codes/api/players'
      })
      .then(function (response) {
          console.log(response.data);
          self.setState({
              players: response.data.players
          })
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    logOut = () => {
        this.setState({
            signIn: false
        })
        this.props.history.index=0
        this.props.history.replace({
            pathname: '/',
            state: {
                email: '',
                user: '',
                token: '',
                signIn: false
            }
        });
    }

    renderPlayerTable = () => {
        if(this.state.players.length > 0) {
            return(
                <div className="mt-1">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Rating</th>
                            <th>Handedness</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.players.map((player, key) => (
                                <tr key={key}>
                                    <td>{player.first_name}</td>
                                    <td>{player.last_name}</td>
                                    <td>{player.rating}</td>
                                    <td>{player.handedness}</td>
                                </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            )
        } else {
            return(
            <h2 className="text-center">No Players Yet, Please add some</h2>
            )
        }
    }

    render() {
        if(this.state.singIn) {
            return(
            <div className="col-12">
                <h1>Roster</h1>
                <div className="col-6 float-left text-left">
                    <h3>{this.state.user.first_name+" "+this.state.user.last_name}</h3>
                </div>
                <div className="col-6 text-right float-right">
                    <button type="submit" onClick={this.addPlayer} className="btn btn-primary">Add Player</button>
                    <button type="submit" onClick={this.logOut} className="btn btn-secondary ml-2">Log Out</button>
                </div>
                <div className="clearfix"></div>
                {this.renderPlayerTable()}
            </div>
            )
        } else {
            return(
                <div className="p-3 mb-2 bg-danger text-white text-center">
                    <h2>You need to be login to watch this page</h2>
                    <Link to="/">Log in</Link>
                </div>
            )
        }
    }
}

export default Roster;
