import React from 'react';
import NavBar from './NavBar';
import Icon from './icon.png';

const user = {
    firstName: 'Arcadio Morales!',
    avatar: Icon
}

function App() {
    return (
        <div>
            <NavBar user={user}/>
        </div>
    )
    
    
}
export default App;