import React, { createContext, useState, ReactNode } from "react";
import { File } from "../types/FileType";

// Define the shape of the context state
interface FileContextState {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileData: object[] | null;
  setFileData: React.Dispatch<React.SetStateAction<object[] | null>>;
  fileId: string | null;
  setFileId: React.Dispatch<React.SetStateAction<string | null>>;
  allFiles: File[] | null;
  setAllFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  filteredFiles: File[] | null;
  setFilteredFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

// Define the props for the provider component
interface FileContextProviderProps {
  children: ReactNode;
}

// Initialize the context with default values
const FileContext = createContext<FileContextState | undefined>(undefined);

function FileContextProvider({ children }: FileContextProviderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<object[] | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [allFiles, setAllFiles] = useState<File[] | null>(null);
  const [filteredFiles, setFilteredFiles] = useState<File[] | null>(null);

  // useEffect(() => {
  //   console.log("selectedFile", selectedFile);
  //   console.log("fileData", fileData);
  //   console.log("fileId", fileId);
  //   console.log("allFiles", allFiles);
  //   console.log("filteredFiles", filteredFiles);
  // }, [selectedFile, fileData, fileId, allFiles, filteredFiles]);

  return (
    <FileContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        fileData,
        setFileData,
        fileId,
        setFileId,
        allFiles,
        setAllFiles,
        filteredFiles,
        setFilteredFiles,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

// Custom hook to use the FileContext
export const useFileContext = (): FileContextState => {
  const context = React.useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileContextProvider");
  }
  return context;
};

export default FileContextProvider;
