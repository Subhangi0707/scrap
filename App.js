import React from 'react';
import Weather from './components/Weather';
import '../src/styles/Weather.css';

const App = () => {
    return (
        <div>
            <h1 className="heading"></h1>
            <Weather />
        </div>
    );
};

export default App;

