"use client";
import { createContext, useCallback, useContext, useState } from "react";
import type { MedRecItem, PreparedMedRecItem } from "@/app/_lib/definition";
import type { z } from "zod";
import type { CreateMedicalRecordSchema } from "@/app/_schemas";

type MedRecItemWithoutId = Omit<MedRecItem, "id">;

interface MedicalRecordContext {
  medicalRecords: MedRecItem[];
  addMedicalRecord: (medicalRecord: z.infer<typeof CreateMedicalRecordSchema>) => void;
  deleteMedicalRecord: (id: string) => void;
  preparedMedicalRecords: () => PreparedMedRecItem[];
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

  const preparedMedicalRecords = useCallback(() => {
    return medicalRecords.map((med) => {
      // Form Data for images
      const formData = new FormData();
      Array.from(med.images).forEach(({ data, id }) => {
        formData.append(`image_${id}`, data);
      });
      return {
        ...med,
        images: formData,
      };
    });
  }, [medicalRecords]);

  return (
    <MedRecordContext.Provider
      value={{ medicalRecords, addMedicalRecord, deleteMedicalRecord, preparedMedicalRecords }}
    >
      {children}
    </MedRecordContext.Provider>
  );
}

export default MedRecordProvider;
