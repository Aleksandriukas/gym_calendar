import React, { createContext } from "react";

export type FileObjectType = {
  name: string;
  path: string;
};

export type DocumentsContextType = {
  documents: FileObjectType[] | undefined;
  setDocuments: React.Dispatch<
    React.SetStateAction<FileObjectType[] | undefined>
  >;
};

export const DocumentsContext = createContext<DocumentsContextType | null>(
  null
);
