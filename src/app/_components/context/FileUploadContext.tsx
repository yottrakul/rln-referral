"use client";
import { createContext, useCallback, useContext, useState } from "react";
import type { FileUpload } from "@/app/_lib/definition";

interface FileUploadContextType {
  datas: Array<FileUpload>;
  addFiles: (files: Array<File>) => void;
  deleteFile: (id: string) => void;
  deleteAllFiles: () => void;
  getNumberOfFiles: () => number;
  // deleteUser: () => Promise<void>;
  // setUserData: (users: UserWithOutPassword[]) => void;
}

export const useFileUploadContext = (): FileUploadContextType => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error("useMedicalContext must be used within a MedicalRecordContextProvider");
  }
  return context;
};

const FileUploadContext = createContext<FileUploadContextType | undefined>(undefined);

function FileUploadProvider({ children }: { children: React.ReactNode }) {
  const [datas, setDatas] = useState<FileUpload[]>([]);

  const addFiles = (files: Array<File>) => {
    // it can have multiple files should use foreach

    setDatas((prev) => {
      return [
        ...prev,
        ...files.map((file) => {
          const id = Math.random().toString(36).substr(2, 9);
          return { id, data: file };
        }),
      ];
    });
  };

  const deleteFile = (id: string) => {
    const newDatas = datas.filter((data) => data.id !== id);
    setDatas(newDatas);
  };

  const deleteAllFiles = () => {
    setDatas([]);
  };

  const getNumberOfFiles = useCallback(() => {
    return datas.length;
  }, [datas]);

  return (
    <FileUploadContext.Provider value={{ datas, addFiles, deleteFile, deleteAllFiles, getNumberOfFiles }}>
      {children}
    </FileUploadContext.Provider>
  );
}

export default FileUploadProvider;
