import React from 'react';
import Icon from './icon.png';
import { UserPanel } from './UserPanel';
class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.onUserLogin = this.onUserLogin.bind(this);
        this.onUserLogout = this.onUserLogout.bind(this);
        this.state = {user: {isLoggedIn: false }}
    }

    onUserLogin(user) {
        user.isLoggedIn = true;
        this.setState({user: user})
    }

    onUserLogout() {
        this.setState({user: {isLoggedIn: false}});
    }
    render() {
        const user = this.state.user;
        return (
            <nav>
                <a href="/">
                    <img className="logo" src={Icon} alt="logo"/>
                </a>
                <UserPanel user={user} onUserLogin={this.onUserLogin} onUserLogout={this.onUserLogout}/>
            </nav>
        );
    }
}


export default NavBar