import dateAdapter from "@date-io/moment";
import { TextField } from "@mui/material";
import {
    MobileDateTimePicker,
    LocalizationProvider,
} from "@mui/x-date-pickers";
import React, { useState } from "react";
import { Input } from "./Input";
import { PlanType } from "./SelectWeek";
export type ChangePlanProps = {
    value: PlanType;
    onNext?: () => void;
    save: () => void;
};

export const ChangePlan = ({ value, onNext, save }: ChangePlanProps) => {
    const [currentDate, setCurrentDate] = useState(value.date);
    return (
        <div>
            <Input value={value.client.name} />
            <Input value={value.client.surname} />
            <LocalizationProvider dateAdapter={dateAdapter}>
                <MobileDateTimePicker
                    ampm={false}
                    renderInput={(props) => (
                        <TextField disabled={true} {...props} />
                    )}
                    label="DateTimePicker"
                    value={currentDate}
                    onChange={(newDate) => {
                        value.date = newDate!;
                        setCurrentDate(newDate!);
                    }}
                />
            </LocalizationProvider>

            <button disabled={onNext === undefined} onClick={onNext}>
                next
            </button>
            <button onClick={save}>save</button>
        </div>
    );
};
