import { useState } from 'react';

const InputButton = ({ initialValue, onChange, name }) => {
    const [value, setValue] = useState(initialValue);


    const handleIncrement = () => {
        setValue(value + 1);
        onChange(value + 1);
    };

    const handleDecrement = () => {
        setValue(value - 1);
        onChange(value - 1);
    };

    const handleChange = (event) => {
        const newValue = parseInt(event.target.value);
        setValue(newValue);
        onChange(newValue);
    };




    return (
        <form>
            <button onClick={handleIncrement}>+</button>
            <input type="number" name={name} value={value} onChange={handleChange} />
            <button onClick={handleDecrement}>-</button>
        </form>
    );
};

export default InputButton;
