import { IoHomeOutline, IoDocumentTextOutline, IoPersonOutline } from "react-icons/io5";
import { LuFolderInput } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";

// คำนำหน้าชื่อในไทย
export const PREFIX_NAME_TH = ["นาย", "นาง", "นางสาว", "เด็กชาย", "เด็กหญิง"];

// คำนำหน้าชื่อในอังกฤษ
export const PREFIX_NAME_EN = ["Mr.", "Mrs.", "Miss", "Master", "Miss"];

// เมนู
export const navItem = [
  {
    title: "Dashboard",
    icon: IoHomeOutline,
    link: "/dashboard",
  },
  {
    title: "รายการคำขอ",
    icon: LuFolderInput,
    link: "/request",
  },
  {
    title: "ประวัติ",
    icon: MdAccessTime,
    link: "/consult",
  },
  {
    title: "คู่มือการใช้งาน",
    icon: IoDocumentTextOutline,
    link: "/consult",
  },
  {
    title: "จัดการผู้ใช้",
    icon: IoPersonOutline,
    link: "/backoffice_user",
  },
];
