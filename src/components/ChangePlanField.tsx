import dateAdapter from "@date-io/moment";
import { TextField } from "@mui/material";
import {
    LocalizationProvider,
    MobileDatePicker,
    MobileTimePicker,
} from "@mui/x-date-pickers";
import React, { useState } from "react";
import { ExerciseField } from "./ExerciseField";
import { Plan } from "./SelectWeek";
import { StringField } from "./StringField";
import "./ChangePlanField.css";
export type ChangePlanFieldProps = {
    value: Plan;
    disabled?: boolean;
    onClose?: () => void;
};

export const ChangePlanField = ({
    disabled = false,
    value,
    onClose,
}: ChangePlanFieldProps) => {
    const [currentFrom, setCurrentFrom] = useState(value.from);
    const [currentTo, setCurrentTo] = useState(value.to);

    return (
        <div className="stringFieldContainer">
            <StringField
                value={disabled ? value.client.name : undefined}
                disabled={disabled}
                label="Name"
                setRealValue={(newValue) => {
                    value.client.name = newValue;
                }}
            />
            <StringField
                value={disabled ? value.client.surname : undefined}
                disabled={disabled}
                label="Surname"
                setRealValue={(newValue) => {
                    value.client.surname = newValue;
                }}
            />
            <LocalizationProvider dateAdapter={dateAdapter}>
                <MobileDatePicker
                    disabled={disabled}
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="DateTimePicker"
                    value={disabled ? value.from : currentFrom}
                    onChange={(newDate) => {
                        value.from = newDate!;
                        setCurrentFrom(newDate!);
                        newDate?.setHours(value.to.getHours());
                        setCurrentTo(newDate!);
                    }}
                />
                <MobileTimePicker
                    ampm={false}
                    disabled={disabled}
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="DateTimePicker"
                    value={disabled ? value.from : currentFrom}
                    onChange={(newDate) => {
                        value.from = newDate!;
                        setCurrentFrom(newDate!);
                    }}
                />
                <MobileTimePicker
                    ampm={false}
                    disabled={disabled}
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="DateTimePicker"
                    value={disabled ? value.to : currentTo}
                    onChange={(newDate) => {
                        value.to = newDate!;
                        setCurrentTo(newDate!);
                    }}
                />
                <ExerciseField disabled={disabled} value={value.exercises} />
            </LocalizationProvider>
            {!disabled && <button onClick={onClose}>Confirm</button>}
        </div>
    );
};
