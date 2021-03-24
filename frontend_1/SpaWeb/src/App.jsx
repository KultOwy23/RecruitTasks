import React from 'react';
import NavBar from './NavBar';
import Icon from './icon.png';
import { StylesProvider } from "@material-ui/core/styles";

const user = {
    avatar: Icon
}

function App() {
    return (
        <StylesProvider injectFirst>
            <NavBar user={user}/>
        </StylesProvider>
    )
}
export default App;