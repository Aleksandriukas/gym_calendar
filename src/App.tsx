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
  const existDir = await exists(DIRECTORY_NAME, { dir: BaseDirectory.Desktop });
  if (!existDir) {
    await createDir(DIRECTORY_NAME, { dir: BaseDirectory.Desktop }); // Created there to debugging
  }
};

const planlist = new LinkList<PlanType>();

// const toggleIter = () => {
//   iter = iter.next();
// };

function App() {
  const [file, setFile] = useState<FileEntry>();
  const [editMenu, setEditMenu] = useState(false);
  const [content, setContent] = useState();
  let iter = planlist.begin();

  const toggleIter = () => {
    console.log("iert");
    iter = iter.copy().next();
    console.log(iter.pointer);
  };
  const setPath = useCallback(async (value: FileEntry) => {
    const readFile = await readTextFile(`${DIRECTORY_NAME}/${value.name}`, {
      dir: BaseDirectory.Desktop,
    });
    const parsedFile: PlanType[] = JSON.parse(readFile);

    for (const element of parsedFile) {
      planlist.pushBack(element);
    }

    setFile(value);
    setEditMenu(true);
  }, []);

  useEffect(() => {
    createDirectory();
  }, [file]);

  return (
    <div className="container">
      {editMenu ? (
        <ChangePlan value={iter.pointer} onNext={toggleIter} />
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
