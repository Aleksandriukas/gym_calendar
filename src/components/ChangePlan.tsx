import React, { useEffect, useState } from "react";
import { PlanType } from "./SelectWeek";

export type ChangePlanProps = {
  value: PlanType;
  onNext?: () => void;
};

export const ChangePlan = ({ value, onNext }: ChangePlanProps) => {
  const [val, setVal] = useState(value.client.name);

  return (
    <div>
      <h1>{value.client.name}</h1>
      <input
        value={val}
        onChange={(event) => {
          value.client.name = event.target.value;
          setVal(event.target.value);
        }}
      ></input>
      <button
        disabled={onNext === undefined}
        onClick={(e) => {
          console.log("click");
          onNext?.();
        }}
      >
        next
      </button>
    </div>
  );
};
