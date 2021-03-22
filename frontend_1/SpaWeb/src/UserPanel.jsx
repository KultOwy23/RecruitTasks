import React from 'react';
import Icon from './icon.png';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { RootRef } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


function Avatar(props) {
    if(props.user.avatar) {
        return <img className="Avatar" src={props.user.avatar} alt="avatar"></img>
    }
    return <img className="Avatar" src={Icon} alt="avatar"></img>
}


export default function UserPanel(props) {
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
        <Button classes={{
              root: "UserPanelRoot",
              label: "UserPanelLabel"
            }} onClick={handleClick}>
              <Avatar user={props.user}/>
              <span className="UserLogin">{props.user.firstName}</span>
        </Button>
        
        <Menu
          classes={{
            paper: "UserPanelMenu"
          }}
          id="simple-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={login}>Login</MenuItem>
        </Menu>
      </div>
    );
  }