import dateAdapter from "@date-io/moment";
import { TextField } from "@mui/material";
import {
    LocalizationProvider,
    MobileDateTimePicker,
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
    const [currentDate, setCurrentDate] = useState(value.date);

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
                <MobileDateTimePicker
                    ampm={false}
                    disabled={disabled}
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="DateTimePicker"
                    value={disabled ? value.date : currentDate}
                    onChange={(newDate) => {
                        value.date = newDate!;
                        setCurrentDate(newDate!);
                    }}
                />
                <ExerciseField disabled={disabled} value={value.exercises} />
            </LocalizationProvider>
            {!disabled && <button onClick={onClose}>Confirm</button>}
        </div>
    );
};
