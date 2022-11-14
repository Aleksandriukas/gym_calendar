import React, { useEffect, useState } from "react";
import { PlanType } from "./SelectWeek";

export type ChangePlanProps = {
  value: PlanType;
  onNext?: () => void;
};

export const ChangePlan = ({ value, onNext }: ChangePlanProps) => {
  const [update, setUpdate] = useState(false);

  const forceUpdate = () => {
    setUpdate((old) => !old);
  };

  useEffect(() => {
    console.log(value);
  }, [update]);
  return (
    <div>
      <h1>{value.client.name}</h1>
      <button
        onClick={() => {
          forceUpdate();
          onNext?.();
        }}
      >
        next
      </button>
    </div>
  );
};
