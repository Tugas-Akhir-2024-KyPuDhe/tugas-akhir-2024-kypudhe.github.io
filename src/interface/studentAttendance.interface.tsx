import { StudentDetail } from "./auth.interface";

export interface IStudentAttendanceInClass {
  id: number,
  uuid: string,
  classId: number,
  date: string,
  startTime: string,
  endTime: string,
  status: number,
  notes: string,
  detailAttendanceStudents: IStudentAttendanceDetail[],
  createdBy: string,
  createdAt: string,
  updatedAt: string,
}

export interface IStudentAttendanceDetail{
  id: number,
  uuid: string,
  attendanceId: number,
  nis: string,
  checkInTime: string,
  checkOutTime: string,
  status: number,
  notes: string,
  createdAt: string,
  updatedAt: string,
  student: StudentDetail,
}

export interface IGetAttendance {
  status: number;
  message: string;
  data?: IStudentAttendanceInClass
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
};

export interface IUpdateAttendance {
  attendanceId: number;
  data: UpdateStudentAttendance[];
};