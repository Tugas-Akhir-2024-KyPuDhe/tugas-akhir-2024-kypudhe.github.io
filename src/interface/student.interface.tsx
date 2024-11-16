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