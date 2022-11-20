import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { Exercise } from "./SelectWeek";

export type ExerciseFieldProps = {
    value: Exercise[];
    disabled?: boolean;
};

export const ExerciseField = ({ value, disabled }: ExerciseFieldProps) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [newExercise, setNewExercise] = useState<Exercise>({
        quantity: 0,
        type: "",
    });
    if (disabled) {
        return (
            <ul>
                {value.map((item, index) => {
                    return (
                        <li key={index}>
                            <p>
                                {item.type}: {item.quantity}
                            </p>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <div>
            <ul>
                {currentValue.map((item, index) => {
                    return (
                        <li key={index}>
                            <p>
                                {item.type}: {item.quantity}
                            </p>
                        </li>
                    );
                })}
            </ul>
            <div>
                <TextField
                    label="Type"
                    value={newExercise.type}
                    onChange={(event) => {
                        setNewExercise({
                            quantity: newExercise.quantity,
                            type: event.target.value,
                        });
                    }}
                />
                <TextField
                    type="number"
                    label="Quantity"
                    value={newExercise.quantity}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setNewExercise({
                            quantity: event.target.valueAsNumber,
                            type: newExercise.type,
                        });
                    }}
                />
                <button
                    onClick={() => {
                        value.push(newExercise);
                        setCurrentValue([...value]);
                    }}
                >
                    Set
                </button>
            </div>
        </div>
    );
};
