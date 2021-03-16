import React from 'react';
// import Icon from './icon.png';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

class UserPanel extends React.Component {
    render() {
        return (
            <p class="welcome">{this.props.user.firstName}</p>
        )
    }
}
class NavBar extends React.Component {
    render() {
        return (
            <div>
                <div class="logo"/>
                <h1>SpaWeb</h1>
                <UserPanel user={this.props.user}/>
            </div>
        );
    }
}


export default NavBar