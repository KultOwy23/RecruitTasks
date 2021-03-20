import React from 'react';
import Icon from './icon.png';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

function Avatar(props) {
    if(props.user.avatar) {
        return <img className="Avatar" src={props.user.avatar} alt="avatar"></img>
    }
    return <img className="Avatar" src={Icon} alt="avatar"></img>
}

function UserPanel(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const login = () => {
        console.log(`Login clicked!`);
        handleClose();
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div className="UserPanelContainer">
        <div className="UserPanel" onClick={handleClick}>
            <Avatar user={props.user}/>
            <span className="UserLogin">{props.user.firstName}</span>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={login}>Login</MenuItem>
        </Menu>
      </div>
    );
  }


class NavBar extends React.Component {
    render() {
        return (
            <nav>
                <a href="/">
                    <img className="logo" src={Icon} alt="logo"/>
                </a>
                <UserPanel user={this.props.user}/>
            </nav>
        );
    }
}


export default NavBar