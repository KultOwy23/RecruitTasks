import React from 'react';
import Icon from './icon.png';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

function Avatar(props) {
    if(props.user.avatar) {
        return <img class="Avatar" src={props.user.avatar}></img>
    }
    return <img class="Avatar" src={Icon}></img>
}

class UserPanel extends React.Component {
    login() {
        console.log(`Login clicked!`);
    }

    render() {
        return (
            <div class="UserPanel" onClick={this.login}>
                <Avatar user={this.props.user}/>
                <span class="UserLogin">{this.props.user.firstName}</span>
            </div>
        )
    }
}
class NavBar extends React.Component {
    render() {
        return (
            <nav>
                <a href="/">
                    <img class="logo" src={Icon} />
                </a>
                <UserPanel user={this.props.user}/>
            </nav>
        );
    }
}


export default NavBar