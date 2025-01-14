import './Input.css';

interface IInputProps {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

function Input({ value, setValue }: IInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValue(e.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Введите название фильма"
        />
    );
}

export default Input;
