import React, { useCallback, useEffect, useState } from "react";
import "./SelectWeek.css";
import {
  writeFile,
  BaseDirectory,
  exists,
  readDir,
  FileEntry,
} from "@tauri-apps/api/fs";
import { DIRECTORY_NAME } from "../App";
import { NewFileModal } from "./NewFileModal";

export type PlanType = {
  date: string;
  time: string;
  client: {
    name: string;
    surname: string;
  };
  exercises: {
    type: string;
    quantity: number;
  } | null;
};

const createInitialValues = (weekIndex: number) => {
  const date = new Date().setFullYear(2022, 11, weekIndex * 1);

  const initialValues: PlanType = {
    date: date.toString(),
    time: "10:00",
    client: {
      name: "unknown",
      surname: "unknown",
    },
    exercises: null,
  };
  return initialValues;
};

export const scanDir = async () => {
  let index = 1;

  while (1) {
    const result = await exists(`${DIRECTORY_NAME}/plan${index}.json`, {
      dir: BaseDirectory.Desktop,
    });
    if (!result) {
      return index;
    }
    index++;
  }
};

export const createFile = async () => {
  const fileIndex = await scanDir();
  const initialValues = await createInitialValues(fileIndex!);
  await writeFile(
    `${DIRECTORY_NAME}/plan${fileIndex}.json`,
    JSON.stringify(initialValues),
    {
      dir: BaseDirectory.Desktop,
    }
  );
};

export const SelectWeek = () => {
  const [filesList, setFilesList] = useState<FileEntry[]>();

  const [update, setUpdate] = useState(false);
  const forceUpdate = useCallback(() => {
    setUpdate((old) => !old);
  }, []);

  const findPlans = useCallback(async () => {
    const results = await readDir(DIRECTORY_NAME, {
      dir: BaseDirectory.Desktop,
    });
    results.filter((value) => {
      if (value.name?.startsWith("plan")) {
        console.log(value.path);
        return true;
      } else {
        return false;
      }
    });
    setFilesList(results);
  }, []);

  useEffect(() => {
    findPlans();
    setFilesList(filesList?.filter((value) => value.name?.startsWith("plan")));
  }, [update, filesList]);

  return (
    <div className="SelectWeek-Container">
      <h1>Select week</h1>
      <button
        onClick={() => {
          createFile();
          forceUpdate();
        }}
      >
        Create new week
      </button>
      <div className="line" />

      {filesList?.length === 0 ? (
        <h1>Welcome, please create your first week plan!</h1>
      ) : (
        <h1>Welcome, select your plan!</h1>
      )}

      {filesList?.map((value, index) => {
        return <button>{value.name}</button>;
      })}
    </div>
  );
};
