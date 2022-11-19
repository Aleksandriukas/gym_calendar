import dateAdapter from "@date-io/moment";
import { Dialog, DialogContent, TextField } from "@mui/material";
import {
    MobileDateTimePicker,
    LocalizationProvider,
} from "@mui/x-date-pickers";
import React, { useCallback, useState } from "react";
import { ExerciseField } from "./ExerciseField";
import { Plan } from "./SelectWeek";
import { StringField } from "./StringField";
import "./ChangePlan.css";
import { PlanField } from "./PlanField";

export type ChangePlanProps = {
    value: Plan;
    onNext?: () => void;
    onPrev?: () => void;
    save: () => void;
    backToMenu: () => void;
    createNew: (value: Plan) => void;
};

export const ChangePlan = ({
    value,
    onNext,
    save,
    onPrev,
    backToMenu,
}: ChangePlanProps) => {
    const [currentDate, setCurrentDate] = useState(value.date);
    const [openModal, setOpenModal] = useState(false);

    const toggleSetOpenModal = useCallback(() => {
        setOpenModal((old) => !old);
    }, []);

    return (
        <div className="changePlanContainer">
            <Dialog onClose={toggleSetOpenModal} open={openModal}>
                <DialogContent>
                    <PlanField />
                </DialogContent>
            </Dialog>
            <button onClick={backToMenu}> Back to menu</button>
            <StringField
                label="Name"
                setRealValue={(newValue) => {
                    value.client.name = newValue;
                }}
                value={value.client.name}
            />
            <StringField
                label="Surname"
                setRealValue={(newValue) => {
                    value.client.surname = newValue;
                }}
                value={value.client.surname}
            />
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

            <ExerciseField value={value.exercises} />
            <div className="buttonContainer">
                <button disabled={onPrev === undefined} onClick={onPrev}>
                    Back
                </button>
                <div>
                    <button onClick={toggleSetOpenModal}>new</button>
                    <button onClick={save}>save</button>
                </div>
                <button disabled={onNext === undefined} onClick={onNext}>
                    next
                </button>
            </div>
        </div>
    );
};
