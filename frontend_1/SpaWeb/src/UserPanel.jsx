import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from './icon.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';

const loginURL = 'http://localhost:8080/'


function UserLabel(props) {
    if(props.user.isLoggedIn) {
        return (
          <div className="UserPanelLabel">
            <img className="Avatar" src={props.user.avatar} alt="avatar"></img>
            <span className="UserLogin">{props.user.firstName}</span>
          </div>
        )
    }
    return <AccountCircleIcon/>
}


class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {anchorEl: null};
  }

  handleLoginClick() {
    axios.get(loginURL)
    .then(response => {
        const user = {
          firstName: `Arcadio Morales`,
          avatar: Icon
        }

        this.props.onUserLogin(user);
      }).catch(err => {
        console.log(`Login error: ${err}`)
      })
    this.closeMenu();
  }

  handleLogoutClick() {
    axios.get(loginURL)
      .then(res => {
        this.props.onUserLogout();
      }).catch(err => {
        console.log(`Login error: ${err}`)
      })
    this.closeMenu();
  }

  openMenu(event) {
    this.setState({anchorEl: event.currentTarget});
  };
  
  closeMenu() {
    this.setState({anchorEl: null});
  }

  render() {
    const isLoggedIn = this.props.user.isLoggedIn;
    let userLabel = <UserLabel loggedIn={isLoggedIn} user={this.props.user}/>
    let loginButton = !isLoggedIn ? <MenuItem onClick={this.handleLoginClick}>Login</MenuItem> : <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
    return (
      <div className="UserPanelContainer">
          <Button classes={{
              root: "UserPanelRoot",
              label: "UserPanel"
            }} onClick={this.openMenu}>
            {userLabel}
          </Button>
          <Menu
            classes={{
              paper: "UserPanelMenu"
            }}
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={Boolean(this.state.anchorEl)}
            onClose={this.closeMenu}
          >
          {loginButton}
        </Menu>
      </div>
    )
  }
}

export { UserPanel }