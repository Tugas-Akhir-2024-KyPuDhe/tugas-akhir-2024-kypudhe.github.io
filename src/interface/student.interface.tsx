import { Fajusek } from "./fajusek.interfase"
import { Media } from "./media.interface"
import { Class } from "./studentClass.interface"
import { StudentsGrades } from "./studentGrade.interface"
import { StudentHistory } from "./studentHistory.interface"

export interface ParentOfStudent {
    id: number
    uuid: string
    fatherName: string
    motherName: string
    parentJob: string
    parentAddress: string
    phone: string
    createdAt: Date
    updatedAt: Date
  }

  export interface FormParentOfStudent {
    fatherName?: string;
    motherName?: string;
    parentJob?: string;
    parentAddress?: string;
    phone?: string;
  }

  export interface StudentDetail {
    id: number;
    uuid: string;
    name: string;
    birthPlace: string;
    address: string;
    phone: string;
    email: string;
    startYear: Date;
    endYear: string | null;
    mediaId: string | null;
    createdAt: string;
    updatedAt: string;
    photo: Media;
    gender: string;
    nis: string;
    nisn: string;
    Major: Fajusek
    class: Class
    status: string;
    ParentOfStudent: ParentOfStudent[];
    StudentsGrades: StudentsGrades[]
    HistoryClass: StudentHistory[];
    // user: {
    //   username: string;
    //   password: string;
    // };
  }


  export interface ResponseGetStudent<T = unknown>{
    status: number;
    message: string;
    data: T;
  }

  export interface PayloadInsertStundets {
    id: string;
    collectionNis: string[];
  }
