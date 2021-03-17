import React from 'react';
import Icon from './icon.png';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

function Avatar(props) {
    if(props.user.avatar) {
        return <img className="Avatar" src={props.user.avatar} alt="avatar"></img>
    }
    return <img className="Avatar" src={Icon} alt="avatar"></img>
}

class UserPanel extends React.Component {
    login() {
        console.log(`Login clicked!`);
    }

    render() {
        return (
            <div className="UserPanel" onClick={this.login}>
                <Avatar user={this.props.user}/>
                <span className="UserLogin">{this.props.user.firstName}</span>
            </div>
        )
    }
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