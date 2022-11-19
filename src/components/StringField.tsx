import TextField, { BaseTextFieldProps } from "@mui/material/TextField";
import React, { useState } from "react";

export type InputProps = {
    value: string;
    setRealValue: (newValue: string) => void;
} & BaseTextFieldProps;

export const StringField = ({ value, setRealValue, ...other }: InputProps) => {
    const [currentValue, setCurrentValue] = useState(value);
    return (
        <TextField
            variant="standard"
            value={currentValue}
            onChange={(event) => {
                setRealValue(event.target.value);
                setCurrentValue(event.target.value);
            }}
            {...other}
        />
    );
};
