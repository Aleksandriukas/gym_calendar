import TextField, { BaseTextFieldProps } from "@mui/material/TextField";
import React, { useState } from "react";

export type InputProps = {
    setRealValue: (newValue: string) => void;
} & BaseTextFieldProps;

export const StringField = ({ setRealValue, ...other }: InputProps) => {
    const [currentValue, setCurrentValue] = useState("");
    return (
        <TextField
            variant="outlined"
            value={currentValue}
            onChange={(event) => {
                setRealValue(event.target.value);
                setCurrentValue(event.target.value);
            }}
            {...other}
        />
    );
};
