import React, { createContext, useState } from "react";

const FileContext = createContext(null);
function FileContextProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<JSON | null>(null);
  const [fileId, setFileId] = useState(null);
  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile, fileData, setFileData, fileId, setFileId }}>
      {children}
    </FileContext.Provider>
  );
}
export const useFileContext = () => React.useContext(FileContext);

export default FileContextProvider;
