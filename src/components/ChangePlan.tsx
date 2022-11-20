import { Dialog, DialogContent } from "@mui/material";
import React, { useCallback, useState } from "react";
import { ChangePlanField } from "./ChangePlanField";
import { DeleteField } from "./DeleteField";

import { PlanField } from "./PlanField";
import { Plan } from "./SelectWeek";
import "./ChangePlan.css";

export type ChangePlanProps = {
    value: Plan;
    onNext?: () => void;
    onPrev?: () => void;
    save: () => void;
    maxPosition: number;
    backToMenu: () => void;
    createNew: (value: Plan, position: number) => void;
    deleteCurrent: () => void;
    deleteByPosition: (position: number) => void;
};

export const ChangePlan = ({
    value,
    onNext,
    save,
    maxPosition,
    onPrev,
    backToMenu,
    deleteByPosition,
    deleteCurrent,
    createNew,
}: ChangePlanProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [openChangeModal, setOpenChangeModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const toggleSetOpenModal = useCallback(() => {
        setOpenModal((old) => !old);
    }, []);

    const toggleSetChangeModal = useCallback(() => {
        setOpenChangeModal((old) => !old);
    }, []);

    const toggleSetDeleteModal = useCallback(() => {
        setOpenDeleteModal((old) => !old);
    }, []);

    return (
        <div className="changePlanContainer">
            <Dialog onClose={toggleSetOpenModal} open={openModal}>
                <DialogContent>
                    <PlanField
                        onClose={toggleSetOpenModal}
                        maxPosition={maxPosition}
                        createNewPlan={createNew}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={openChangeModal} onClose={toggleSetChangeModal}>
                <DialogContent>
                    <ChangePlanField
                        onClose={toggleSetChangeModal}
                        value={value}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={openDeleteModal} onClose={toggleSetDeleteModal}>
                <DialogContent>
                    <DeleteField
                        onClose={toggleSetDeleteModal}
                        maxPosition={maxPosition}
                        deleteByPosition={deleteByPosition}
                    />
                </DialogContent>
            </Dialog>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
                <button onClick={backToMenu}> Back to menu</button>
                <div>
                    <button onClick={deleteCurrent}>Delete current</button>
                    <button onClick={toggleSetDeleteModal}>
                        Delete by position
                    </button>
                </div>
            </div>

            <ChangePlanField value={value} disabled />

            <div className="buttonContainer">
                <button disabled={onPrev === undefined} onClick={onPrev}>
                    Back
                </button>
                <div>
                    <button onClick={toggleSetChangeModal}>change</button>
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
