import React from 'react';
import Register from './Register';
import Login from './Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

export const firebaseConfig = {
  apiKey: "AIzaSyCa1_bTzfd1RfDX8Xg80obTdngkOuwf1Co",
  authDomain: "uni-react-project.firebaseapp.com",
  databaseURL: "https://uni-react-project.firebaseio.com",
  projectId: "uni-react-project",
  storageBucket: "uni-react-project.appspot.com",
  messagingSenderId: "648864139754",
  appId: "1:648864139754:web:fe2415af1031cc5fbf0a93"
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
