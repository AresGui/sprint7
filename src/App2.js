import React from 'react';
import NumberInputButton from './NumberInputButton';

function App() {
    const handleNumberChange = (value) => {
        console.log('New value:', value);
        // Perform any other actions with the updated value
    };

    return (
        <div>
            <NumberInputButton initialValue={0} onChange={handleNumberChange} />
        </div>
    );
}

export default App;
