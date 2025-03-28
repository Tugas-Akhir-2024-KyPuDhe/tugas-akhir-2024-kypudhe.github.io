import { StudentDetail } from "./auth.interface";

export interface IStudentAttendanceInClass {
  id: number;
  uuid: string;
  classId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: number;
  notes: string;
  detailAttendanceStudents: IStudentAttendanceDetail[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStudentAttendanceDetail {
  id: number;
  uuid: string;
  attendanceId: number;
  nis: string;
  checkInTime: string;
  checkOutTime: string;
  status: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  student: StudentDetail;
}

export interface IGetAttendance {
  status: number;
  message: string;
  data?: IStudentAttendanceInClass;
}

export interface IPayloadAttendance {
  classId: number;
  date: string;
  createdBy: string;
  notes: string;
}

export interface UpdateStudentAttendance {
  id: number;
  nis: string;
  notes: string;
  status: number;
}

export interface IUpdateAttendance {
  attendanceId: number;
  data: UpdateStudentAttendance[];
}
export interface IDetailStudentAttendance {
  status: number;
  notes: string;
  tanggal: string;
}
export interface IDataSummaryAttendance {
  nis: string;
  name: string;
  absensi: IDetailStudentAttendance[];
}
export interface IGetSummaryAttendance {
  status: number;
  message: string;
  data: IDataSummaryAttendance[];
}
// ================
export interface AttendanceRecord {
  id: number;
  attendanceId: number;
  status: number;
  notes: string | null;
  date: string;
  className: string;
}
export interface AttendanceMonth {
  month: string;
  records: AttendanceRecord[];
}
export interface AttendanceData {
  nis: string;
  name: string;
  attendances: AttendanceMonth[];
}
export interface IGetStudentDetailAttendance {
  status: number;
  message: string;
  data: AttendanceData;
}



