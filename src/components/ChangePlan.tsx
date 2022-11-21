import { Dialog, DialogContent, TextField } from "@mui/material";
import { BaseDirectory, writeFile } from "@tauri-apps/api/fs";
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
    search: (name: string, surname: string) => void;
    foundArray?: Plan[];
    findAll: () => void;
    allPlan: Plan[];
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
    foundArray,
    search,
    allPlan,
    findAll,
}: ChangePlanProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [openChangeModal, setOpenChangeModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openAllPlan, setOpenAllPlan] = useState(false);

    const toggleSetOpenModal = useCallback(() => {
        setOpenModal((old) => !old);
    }, []);

    const toggleSetChangeModal = useCallback(() => {
        setOpenChangeModal((old) => !old);
    }, []);

    const toggleSetDeleteModal = useCallback(() => {
        setOpenDeleteModal((old) => !old);
    }, []);

    const toggleOpenSearch = useCallback(() => {
        if (foundArray) {
            setOpenSearch((old) => !old);
        }
    }, [foundArray]);

    const toggleOpenMenu = useCallback(() => {
        setOpenMenu((old) => !old);
    }, []);

    const toggleOpenAllPlan = useCallback(() => {
        setOpenAllPlan((old) => !old);
    }, []);

    const writeToFile = useCallback(async () => {
        if (foundArray) {
            const name =
                foundArray[0].client.name + foundArray[0].client.surname;
            await writeFile(`${name}.json`, JSON.stringify(foundArray), {
                dir: BaseDirectory.Desktop,
            });
        }
    }, [foundArray]);

    const [foundName, setFoundName] = useState("");
    const [foundSurname, setFoundSurname] = useState("");

    return (
        <div className="changePlanContainer">
            <Dialog open={openMenu} onClose={toggleOpenMenu}>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={foundName}
                        onChange={(event) => {
                            setFoundName(event.target.value);
                        }}
                    />
                    <TextField
                        label="Surname"
                        value={foundSurname}
                        onChange={(event) => {
                            setFoundSurname(event.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            search(foundName, foundSurname);
                            toggleOpenSearch();
                            toggleOpenMenu();
                        }}
                    >
                        Find
                    </button>
                </DialogContent>
            </Dialog>
            <Dialog onClose={toggleOpenSearch} open={openSearch}>
                <DialogContent>
                    <div>
                        <button onClick={writeToFile}>Copy to txt</button>
                        <button>Only exercise</button>
                        {foundArray?.map((value, index) => {
                            return (
                                <ChangePlanField
                                    disabled
                                    value={value}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog onClose={toggleOpenAllPlan} open={openAllPlan}>
                <DialogContent>
                    <div>
                        {allPlan?.map((value, index) => {
                            return (
                                <ChangePlanField
                                    disabled
                                    value={value}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </DialogContent>
            </Dialog>
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
                    <button onClick={toggleOpenMenu}>Search</button>
                    <button
                        onClick={() => {
                            findAll();
                            toggleOpenAllPlan();
                        }}
                    >
                        See all
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
