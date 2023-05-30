
import { useLocalStorage } from '../useLocalStorage';

const InputButton = ({ initialValue, onChange, name }) => {
    const [value, setValue] = useLocalStorage("value", initialValue);


    const handleIncrement = (event) => {
        event.preventDefault();
        setValue(value + 1);
        onChange(value + 1);
    };

    const handleDecrement = (event) => {
        event.preventDefault();

        if (value > 0) {
            setValue(value - 1);
            onChange(value - 1);
        } else {
            setValue(0);
        }
    };

    const handleChange = (event) => {
        const newValue = parseInt(event.target.value);
        setValue(newValue);
        onChange(newValue);
    };


    return (
        <div>
            <button onClick={handleIncrement}>+</button>
            <input type="number" name={name} value={value} onChange={handleChange} />
            <button onClick={handleDecrement}>-</button>
        </div>
    );
};

export default InputButton;
