import {
    BaseDirectory,
    createDir,
    exists,
    FileEntry,
    readTextFile,
    writeFile,
} from "@tauri-apps/api/fs";
import { LinkList } from "js-sdsl";
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { ChangePlan } from "./components/ChangePlan";
import { PlanType, SelectWeek } from "./components/SelectWeek";
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

// eslint-disable-next-line @typescript-eslint/naming-convention
function App() {
    const [file, setFile] = useState<FileEntry>();
    const [editMenu, setEditMenu] = useState(false);
    const [path, setPath] = useState<FileEntry>({
        name: "",
        path: "",
    });

    const planListReference = useRef(new LinkList<PlanType>());
    const [iter, setIter] = useState(planListReference.current.begin());
    const next = useCallback(() => {
        setIter(iter.next().copy());
    }, [iter]);

    const saveToFile = useCallback(async () => {
        let iter = planListReference.current.begin();

        const array: PlanType[] = [];

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
        const parsedFile: PlanType[] = JSON.parse(readFile);

        for (const element of parsedFile) {
            planListReference.current.pushBack(element);
        }

        setIter(planListReference.current.begin());
        setFile(value);
        setEditMenu(true);
    }, []);

    useEffect(() => {
        createDirectory();
    }, []);

    return (
        <DocumentsContext.Provider value={{ path, setPath }}>
            <div className="container">
                <div className="formBackground">
                    {editMenu ? (
                        <ChangePlan
                            value={iter.pointer}
                            save={saveToFile}
                            onNext={
                                iter.equals(
                                    planListReference.current.end().pre()
                                )
                                    ? undefined
                                    : next
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
}

export default App;
