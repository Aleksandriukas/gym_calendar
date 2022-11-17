import React, { useState } from "react";

export type InputProps = {
    value: string;
};

export const Input = ({ value }: InputProps) => {
    const [currentValue, setCurrentValue] = useState(value);
    return (
        <input
            value={currentValue}
            onChange={(event) => {
                value = currentValue;
                setCurrentValue(event.target.value);
            }}
        />
    );
};
