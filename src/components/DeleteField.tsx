import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

export type DeleteFieldProps = {
    deleteByPosition: (position: number) => void;
    maxPosition: number;
    onClose: () => void;
};

export const DeleteField = ({
    deleteByPosition,
    onClose,
    maxPosition,
}: DeleteFieldProps) => {
    const [position, setPosition] = useState(0);

    return (
        <div style={{ flexDirection: "column", display: "flex" }}>
            <TextField
                error={position < 0 || position > maxPosition - 1}
                type="number"
                value={position}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPosition(event.target.valueAsNumber);
                }}
            />
            <button
                disabled={position < 0 || position > maxPosition - 1}
                onClick={() => {
                    deleteByPosition(position);
                    onClose();
                }}
            >
                Confirm
            </button>
        </div>
    );
};
