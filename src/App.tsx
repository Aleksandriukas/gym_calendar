import { useEffect, useState } from "react";
import "./App.css";
import { Calendar } from "./components/Calendar";
import {
  BaseDirectory,
  createDir,
  writeFile,
  readDir,
} from "@tauri-apps/api/fs";
import { DocumentsContext, FileObjectType } from "./DocumentsContext";
import { SelectWeek } from "./components/SelectWeek";

export const DIRECTORY_NAME = "Trainee_week_plans";

const createDirectory = async () => {
  await createDir(DIRECTORY_NAME, { dir: BaseDirectory.Desktop }); // Created there to debugging
};

function App() {
  const [documents, setDocuments] = useState<FileObjectType[]>();
  useEffect(() => {
    createDirectory();
  });

  return (
    <DocumentsContext.Provider
      value={{ documents: documents, setDocuments: setDocuments }}
    >
      <div className="container">
        <SelectWeek />
      </div>
    </DocumentsContext.Provider>
  );
}

export default App;
