import React from 'react';
import Register from './Register';
import Login from './Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import UsersList from './UsersList';
import TasksList from './TasksList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      currentUser: null,
      isAdmin: false
    };
  }

  componentDidMount() {
    const users = localStorage["users"];
    let user = localStorage["currentUser"];

    if (!users) {
      window.localStorage.setItem("users", JSON.stringify([{
        id: "_47wm4ucif",
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@gmail.com",
        password: "123",
        isAdmin: true
      }]));
    }

    if (!!user) {
      user = JSON.parse(user);
      this.setState({
        currentUser: user,
        isAdmin: user.isAdmin
      });
    }
   
  }

  handleOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleNavigation = (path) => {
    this.handleClose();
    window.location.href = `/${path}-list`;
  };

  handleLogOut = () => {
    this.handleClose();
    
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, currentUser, isAdmin } = this.state;
    const usersList = isAdmin && <MenuItem onClick={() => this.handleNavigation("users")}>Users List</MenuItem>;
    const navigation = <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.handleOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {usersList}
          <MenuItem onClick={() => this.handleNavigation("tasks")}>Tasks List</MenuItem>
          <MenuItem onClick={this.handleLogOut}>Logout</MenuItem>
        </Menu>
        { currentUser && <h4>{currentUser.firstName}  {currentUser.lastName}</h4>}
      </Toolbar>
    </AppBar>;

    return (
      <div className={classes.root}>
        <Router>
          <div>
            <Switch>
            <Route path="/tasks-list">
                {navigation}
                <TasksList />
              </Route>
              <Route path="/users-list">
                {navigation}
                <UsersList />
              </Route>
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
      </div>
    )
  }
}

export default withStyles(styles)(App);
