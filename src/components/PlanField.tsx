import dateAdapter from "@date-io/moment";
import { TextField } from "@mui/material";
import {
    LocalizationProvider,
    MobileDateTimePicker,
} from "@mui/x-date-pickers";
import React, { useState } from "react";
import { ExerciseField } from "./ExerciseField";
import { Exercise, Plan } from "./SelectWeek";
export type PlanField = {
    createNewPlan: (value: Plan) => void;
};

export const PlanField = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [date, setDate] = useState(new Date());
    const exercises: Exercise[] = [];

    return (
        <React.Fragment>
            <TextField
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
            <TextField
                value={surname}
                onChange={(event) => {
                    setSurname(event.target.value);
                }}
            />
            <LocalizationProvider dateAdapter={dateAdapter}>
                <MobileDateTimePicker
                    ampm={false}
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="DateTimePicker"
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate!);
                    }}
                />
            </LocalizationProvider>
            <ExerciseField value={exercises} />
        </React.Fragment>
    );
};
