import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { LinkList, LinkListIterator } from "js-sdsl";
import {
  BaseDirectory,
  createDir,
  exists,
  FileEntry,
  readTextFile,
} from "@tauri-apps/api/fs";
import { DocumentsContext, FileObjectType } from "./DocumentsContext";
import { PlanType, SelectWeek } from "./components/SelectWeek";
import { ChangePlan } from "./components/ChangePlan";

export const DIRECTORY_NAME = "Trainee_week_plans";

const createDirectory = async () => {
  const existDir = (await exists(DIRECTORY_NAME, {
    dir: BaseDirectory.Desktop,
  })) as unknown as boolean;
  if (!existDir) {
    await createDir(DIRECTORY_NAME, { dir: BaseDirectory.Desktop }); // Created there to debugging
  }
};

function App() {
  const [file, setFile] = useState<FileEntry>();
  const [editMenu, setEditMenu] = useState(false);

  const planlistRef = useRef(new LinkList<PlanType>());
  const [iter, setIter] = useState(planlistRef.current.begin());

  const next = useCallback(() => {
    console.log("asdf");
    setIter(iter.next().copy());
  }, [iter]);

  const setPath = useCallback(async (value: FileEntry) => {
    const readFile = await readTextFile(`${DIRECTORY_NAME}/${value.name}`, {
      dir: BaseDirectory.Desktop,
    });
    const parsedFile: PlanType[] = JSON.parse(readFile);

    for (const element of parsedFile) {
      planlistRef.current.pushBack(element);
    }

    setIter(planlistRef.current.begin());
    setFile(value);
    setEditMenu(true);
  }, []);

  useEffect(() => {
    createDirectory();
  }, [file]);

  return (
    <div className="container">
      {editMenu ? (
        <ChangePlan
          value={iter.pointer}
          onNext={
            iter.equals(planlistRef.current.end().pre()) ? undefined : next
          }
        />
      ) : (
        <SelectWeek
          setFile={(value) => {
            setPath(value);
          }}
        />
      )}
    </div>
  );
}

export default App;
