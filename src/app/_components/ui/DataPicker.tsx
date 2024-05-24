import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";

export default function DataPicker() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />;
}
