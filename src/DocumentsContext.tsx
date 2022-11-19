import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import { FileEntry } from "@tauri-apps/api/fs";
import React from "react";

export type DocumentsContextType = {
    path: FileEntry;
    setPath: React.Dispatch<React.SetStateAction<FileEntry>>;
};

export const DocumentsContext = createSafeContext<DocumentsContextType>();

export const useDocumentsContext = () => useSafeContext(DocumentsContext);
