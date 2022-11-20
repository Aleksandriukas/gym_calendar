import dateAdapter from "@date-io/moment";
import { TextField } from "@mui/material";
import {
    LocalizationProvider,
    MobileDateTimePicker,
} from "@mui/x-date-pickers";
import React, { ChangeEvent, useState } from "react";
import { ExerciseField } from "./ExerciseField";
import { Exercise, Plan } from "./SelectWeek";
import "./PlanField.css";
export type PlanFieldProps = {
    createNewPlan: (value: Plan, position: number) => void;
    maxPosition: number;
    onClose: () => void;
};

export const PlanField = ({
    createNewPlan,
    maxPosition,
    onClose,
}: PlanFieldProps) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [position, setPosition] = useState<number>(0);
    const [date, setDate] = useState(new Date());
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
                <MobileDateTimePicker
                    ampm={false}
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="Date&time"
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate!);
                    }}
                />
            </LocalizationProvider>
            <ExerciseField value={exercises} />
            <TextField
                error={position > maxPosition || position < 0}
                label="Position"
                type="number"
                value={position}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPosition(event.target.valueAsNumber);
                }}
            />

            <button
                disabled={position > maxPosition || position < 0}
                onClick={() => {
                    onClose();
                    createNewPlan(
                        {
                            client: { name, surname },
                            date,
                            exercises,
                        } as Plan,
                        position
                    );
                }}
            >
                Confirm
            </button>
        </div>
    );
};
