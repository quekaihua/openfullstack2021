import {useState} from 'react'

export const useField = (type, initialState) => {
    const [value, setValue] = useState(initialState)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onReset = (state) => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        onReset,
    }
}