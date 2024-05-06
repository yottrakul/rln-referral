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

//สถานะ
export const statusItem = [
  {
    titleTH: "สร้างคำขอ",
    titleEN: "PENDING",
    color: "#FA7B33",
    bgColor: "#FEFEFE",
  },
  {
    titleTH: "ผ่านการอนุมัติ",
    titleEN: "ACCEPT",
    color: "#00AD30",
    bgColor: "#F7FFF7",
  },
  {
    titleTH: "ปฏิเสธการอนุมัติ",
    titleEN: "REJECT",
    color: "#FF0000",
    bgColor: "#FFF5F5",
  },
  {
    titleTH: "เสร็จสิ้น",
    titleEN: "COMPLETE",
    color: "#00AD30",
    bgColor: "#FEFEFE",
  },
];
