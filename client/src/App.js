import React from 'react';
import './scss/initial.scss';

import Navbar from './components/Navbar';
import Content from './components/Content';

function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            {/* <h1>Welcome to Blovo</h1> */}
            <Content></Content>
        </div>
    );
}

export default App;
