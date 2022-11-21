import dateAdapter from "@date-io/moment";
import { TextField } from "@mui/material";
import {
    LocalizationProvider,
    MobileDatePicker,
    MobileTimePicker,
} from "@mui/x-date-pickers";
import React, { useState } from "react";
import { ExerciseField } from "./ExerciseField";
import { Exercise, Plan } from "./SelectWeek";
import "./PlanField.css";
export type PlanFieldProps = {
    createNewPlan: (value: Plan) => void;
    maxPosition: number;
    onClose: () => void;
};

export const PlanField = ({ createNewPlan, onClose }: PlanFieldProps) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const exercises: Exercise[] = [];

    return (
        <div className="PlanFieldContainer">
            <TextField
                label="Name"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            <TextField
                label="Surname"
                value={surname}
                onChange={(event) => {
                    setSurname(event.target.value);
                }}
            />
            <LocalizationProvider dateAdapter={dateAdapter}>
                <MobileDatePicker
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="Date&time"
                    value={from}
                    onChange={(newDate) => {
                        setFrom(newDate!);
                    }}
                />
                <MobileTimePicker
                    ampm
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="From"
                    value={from}
                    onChange={(newDate) => {
                        setFrom(newDate!);
                    }}
                />
                <MobileTimePicker
                    ampm
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="To"
                    value={to}
                    onChange={(newDate) => {
                        setTo(newDate!);
                    }}
                />
            </LocalizationProvider>
            <ExerciseField value={exercises} />

            <button
                onClick={() => {
                    onClose();
                    createNewPlan({
                        client: { name, surname },
                        from: from,
                        to: to,
                        exercises: exercises,
                    } as Plan);
                }}
            >
                Confirm
            </button>
        </div>
    );
};
