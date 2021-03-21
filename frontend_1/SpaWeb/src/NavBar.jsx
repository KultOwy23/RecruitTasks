import React from 'react';
import Icon from './icon.png';
import UserPanel from './UserPanel';

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