import React from "react";
interface InputProps{
    setValue: React.Dispatch<React.SetStateAction<string>>
    value: string
}
const Input =({value,setValue}:InputProps)=>{
    const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) =>{
        setValue(e.currentTarget.value)
    }
    return(
        <input onChange={handleChange} value={value} className="search_bar"></input>
    )
}
export default Input;