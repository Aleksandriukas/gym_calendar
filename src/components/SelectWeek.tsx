/* eslint-disable unicorn/prevent-abbreviations */
import {
    writeFile,
    BaseDirectory,
    exists,
    readDir,
    FileEntry,
} from "@tauri-apps/api/fs";
import React, { useCallback, useEffect, useState } from "react";
import "./SelectWeek.css";
import { DIRECTORY_NAME } from "../App";

export type Exercise = {
    type: string;
    quantity: number;
};

export type Plan = {
    from: Date;
    to: Date;
    client: {
        name: string;
        surname: string;
    };
    exercises: Exercise[];
};

const createInitialValues = (weekIndex: number) => {
    const initialValues: Plan[] = [];

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= 6; j += 2) {
            const nodePlan: Plan = {
                from: new Date(2022, 11, weekIndex * 7 + i, 8 + j),
                to: new Date(2022, 11, weekIndex * 7 + i, 10 + j),
                client: {
                    name: "unknown",
                    surname: "unknown",
                },
                exercises: [],
            };
            initialValues.push(nodePlan);
        }
    }
    return initialValues;
};

export const scanDirectory = async () => {
    let index = 1;

    // eslint-disable-next-line no-constant-condition
    while (1) {
        const result = (await exists(`${DIRECTORY_NAME}/plan${index}.json`, {
            dir: BaseDirectory.Desktop,
        })) as unknown as boolean;
        if (!result) {
            return index;
        }
        index++;
    }
};

export type SelectWeekProps = {
    setFile: (value: FileEntry) => void;
};

export const SelectWeek = ({ setFile }: SelectWeekProps) => {
    const [filesList, setFilesList] = useState<FileEntry[] | undefined>();

    const findPlans = useCallback(async () => {
        const results = await readDir(DIRECTORY_NAME, {
            dir: BaseDirectory.Desktop,
            // eslint-disable-next-line unicorn/prevent-abbreviations
        }).then((value) => value.filter((val) => val.name?.startsWith("plan")));
        setFilesList(results);
    }, []);

    const createFile = useCallback(async () => {
        const fileIndex = await scanDirectory();
        const initialValues = createInitialValues(fileIndex!);
        await writeFile(
            `${DIRECTORY_NAME}/plan${fileIndex}.json`,
            JSON.stringify(initialValues),
            {
                dir: BaseDirectory.Desktop,
            }
        );
        await findPlans();
    }, [findPlans]);

    useEffect(() => {
        findPlans();
    }, [findPlans]);

    return (
        <div className="SelectWeek-Container">
            <h1>Select week</h1>
            <button onClick={createFile}>Create new week</button>

            {filesList?.length === 0 ? (
                <h1>Welcome, please create your first week plan!</h1>
            ) : (
                <h1>Welcome, select your plan!</h1>
            )}

            {filesList?.map((value, index) => {
                const match = value?.name?.replace(/\D/g, "");
                return (
                    <button
                        onClick={() => {
                            setFile(value);
                        }}
                        key={index}
                    >
                        {`Week ${match}`}
                    </button>
                );
            })}
        </div>
    );
};
