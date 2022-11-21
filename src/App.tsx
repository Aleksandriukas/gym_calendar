import {
    BaseDirectory,
    createDir,
    exists,
    FileEntry,
    readTextFile,
    writeFile,
} from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";
import { LinkList } from "js-sdsl";
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { ChangePlan } from "./components/ChangePlan";
import { Plan, SelectWeek } from "./components/SelectWeek";
import { DocumentsContext } from "./DocumentsContext";

export const DIRECTORY_NAME = "Trainee_week_plans";

const createDirectory = async () => {
    const existDirectory = (await exists(DIRECTORY_NAME, {
        dir: BaseDirectory.Desktop,
    })) as unknown as boolean;
    if (!existDirectory) {
        await createDir(DIRECTORY_NAME, { dir: BaseDirectory.Desktop }); // Created there to debugging
    }
};

const App = () => {
    const [file, setFile] = useState<FileEntry>();
    const [editMenu, setEditMenu] = useState(false);
    const planListReference = useRef(new LinkList<Plan>());
    const [array, setArray] = useState<Plan[]>([]);
    const [allPlan, setAllPlan] = useState<Plan[]>([]);
    const [path, setPath] = useState<FileEntry>({
        name: "",
        path: "",
    });

    const backToMenu = useCallback(() => {
        setEditMenu((old) => !old);
        planListReference.current.clear();
    }, []);

    const [iter, setIter] = useState(planListReference.current.begin());

    const findByUser = (name: string, surname: string) => {
        const foundArray: Plan[] = [];
        let temporaryIter = planListReference.current.begin();

        for (
            let index = 0;
            index < planListReference.current.size() - 1;
            index++
        ) {
            if (
                temporaryIter.pointer.client.name === name &&
                temporaryIter.pointer.client.surname === surname
            ) {
                foundArray.push(temporaryIter.pointer);
            }
            temporaryIter = temporaryIter.next().copy();
        }
        setArray(foundArray);
    };

    const next = useCallback(() => {
        setIter(iter.next().copy());
    }, [iter]);

    const previous = useCallback(() => {
        setIter(iter.pre().copy());
    }, [iter]);

    const createNew = useCallback(
        (value: Plan, position: number) => {
            planListReference.current.insert(position, value);
            setIter(iter.copy());
        },
        [iter]
    );

    const deleteCurrent = useCallback(() => {
        if (planListReference.current.size() === 1) {
            const temporaryFrom = iter.pointer.from;
            temporaryFrom.setHours(8),
                (iter.pointer = {
                    client: { name: "unknown", surname: "unknown" },
                    from: temporaryFrom,
                    to: temporaryFrom,
                    exercises: [],
                } as Plan);
            setIter(iter.copy());
            return;
        }
        if (iter.equals(planListReference.current.end().pre())) {
            setIter(iter.pre().copy());
            planListReference.current.popBack();
            return;
        }

        planListReference.current.eraseElementByIterator(iter);
        setIter(iter.copy());
    }, [iter]);

    const deleteByPosition = useCallback(
        (position: number) => {
            if (planListReference.current.size() === 1) {
                deleteCurrent();
                return;
            }
            if (
                iter.pointer ===
                planListReference.current.getElementByPos(position)
            ) {
                deleteCurrent();
                return;
            }
            planListReference.current.eraseElementByPos(position);
            setIter(iter.copy());
        },
        [deleteCurrent, iter]
    );

    const findAllPlan = useCallback(() => {
        let iter = planListReference.current.begin();

        const array: Plan[] = [];

        // eslint-disable-next-line unicorn/prevent-abbreviations
        for (let i = 0; i < planListReference.current.size(); i++) {
            array.push(iter.pointer);
            iter = iter.next().copy();
        }
        setAllPlan(array);
    }, []);

    const saveToFile = useCallback(async () => {
        let iter = planListReference.current.begin();

        const array: Plan[] = [];

        // eslint-disable-next-line unicorn/prevent-abbreviations
        for (let i = 0; i < planListReference.current.size(); i++) {
            array.push(iter.pointer);
            iter = iter.next().copy();
        }
        await writeFile(
            `${DIRECTORY_NAME}/${path.name}`,
            JSON.stringify(array),
            {
                dir: BaseDirectory.Desktop,
            }
        );
    }, [path]);

    const setFilePath = useCallback(async (value: FileEntry) => {
        setPath(value);

        const readFile = await readTextFile(`${DIRECTORY_NAME}/${value.name}`, {
            dir: BaseDirectory.Desktop,
        });
        const parsedFile: Plan[] = JSON.parse(readFile);

        for (const element of parsedFile) {
            planListReference.current.pushBack(element);
        }

        setIter(planListReference.current.begin());
        setFile(value);
        setEditMenu(true);
    }, []);

    const unlisten = useCallback(async () => {
        await appWindow.onCloseRequested(async () => {
            saveToFile();
        });
    }, [saveToFile]);

    unlisten();

    useEffect(() => {
        createDirectory();
    }, []);

    return (
        <DocumentsContext.Provider value={{ path, setPath }}>
            <div className="container">
                <div className="formBackground">
                    {editMenu ? (
                        <ChangePlan
                            allPlan={allPlan}
                            findAll={findAllPlan}
                            search={findByUser}
                            foundArray={array}
                            deleteByPosition={deleteByPosition}
                            deleteCurrent={deleteCurrent}
                            maxPosition={planListReference.current.size()}
                            createNew={createNew}
                            value={iter.pointer}
                            save={saveToFile}
                            backToMenu={backToMenu}
                            onNext={
                                iter.equals(
                                    planListReference.current.end().pre()
                                )
                                    ? undefined
                                    : next
                            }
                            onPrev={
                                iter.equals(planListReference.current.begin())
                                    ? undefined
                                    : previous
                            }
                        />
                    ) : (
                        <SelectWeek
                            setFile={(value) => {
                                setFilePath(value);
                            }}
                        />
                    )}
                </div>
            </div>
        </DocumentsContext.Provider>
    );
};

export default App;
