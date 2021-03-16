import React from 'react';
import NavBar from './NavBar';


const user = {
    firstName: 'Jose',
    lastName: 'Arcadio Morales!'
}

function App() {
    return (
        <div>
            <NavBar user={user}/>
        </div>
    )
    
    
}
export default App;