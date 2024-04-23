"use client";
import { createContext, useContext, useState } from "react";

export type MedRecItem = {
  id: string;
  doctorId: string;
  detail: string;
  images: FileList;
};

type MedRecItemWithoutId = Omit<MedRecItem, "id">;

interface MedicalRecordContext {
  medicalRecords: MedRecItem[];
  addMedicalRecord: (medicalRecord: MedRecItemWithoutId) => void;
  deleteMedicalRecord: (id: string) => void;
  // deleteUser: () => Promise<void>;
  // setUserData: (users: UserWithOutPassword[]) => void;
}

export const useMedicalContext = (): MedicalRecordContext => {
  const context = useContext(MedRecordContext);
  if (!context) {
    throw new Error("useMedicalContext must be used within a MedicalRecordContextProvider");
  }
  return context;
};

const MedRecordContext = createContext<MedicalRecordContext | undefined>(undefined);

function MedRecordProvider({ children }: { children: React.ReactNode }) {
  const [medicalRecords, setMedicalRecords] = useState<MedRecItem[]>([]);

  const addMedicalRecord = (medicalRecord: MedRecItemWithoutId) => {
    const id = Math.random().toString(36).substr(2, 9);
    const oldMedicalRecords = structuredClone(medicalRecords);
    setMedicalRecords([...oldMedicalRecords, { ...medicalRecord, id }]);
  };

  const deleteMedicalRecord = (id: string) => {
    setMedicalRecords(medicalRecords.filter((medicalRecord) => medicalRecord.id !== id));
  };

  console.log(medicalRecords);

  return (
    <MedRecordContext.Provider value={{ medicalRecords, addMedicalRecord, deleteMedicalRecord }}>
      {children}
    </MedRecordContext.Provider>
  );
}

export default MedRecordProvider;
