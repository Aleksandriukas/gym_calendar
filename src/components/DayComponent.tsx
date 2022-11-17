import React from "react";
import "./DayComponent.css";
export type DayComponentProps = {
    onPress?: () => void;
    date: Date;
};

export const DayComponent = ({ date }: DayComponentProps) => {
    const displayDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;

    return (
        <div>
            <button>
                <div className="DayContainer">
                    <p>{displayDate}</p>
                </div>
            </button>
        </div>
    );
};
