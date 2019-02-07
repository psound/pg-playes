import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Roster from './Roster';
import Add from './New';


const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/register/" component={Register} />
      <Route path="/roster/" component={Roster} />
      <Route path="/player/new/" component={Add} />
    </div>
  </Router>
);

export default App;
