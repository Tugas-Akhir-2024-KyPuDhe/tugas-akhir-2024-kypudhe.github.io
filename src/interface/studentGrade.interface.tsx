export interface StudentsGrades {
  id: number;
  uuid: string;
  nis: string;
  teacherId: number;
  classId: number;
  courseCode: string;
  task: number;
  UH: number;
  PTS: number;
  PAS: number;
  portofolio: string;
  proyek: string;
  attitude: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormStateStudentGrade {
  nis: string;
  teacherId: number;
  classId: number;
  courseCode: string;
  task: number;
  UH: number;
  PTS: number;
  PAS: number;
  portofolio: string;
  proyek: string;
  attitude: string;
  description: string;
}

export interface ResponseActionStudentGrade {
  status: number;
  message: string;
}

