import React from "react";
import { DayComponent } from "./DayComponent";

export const Calendar = () => {
  const date = new Date();

  const array = [1, 2, 3, 4, 5, 6, 7]; //test code

  const listItems = array.map(() => {
    return (
      <li>
        <DayComponent date={date} />
      </li>
    );
  });

  return <ul>{listItems}</ul>;
};
