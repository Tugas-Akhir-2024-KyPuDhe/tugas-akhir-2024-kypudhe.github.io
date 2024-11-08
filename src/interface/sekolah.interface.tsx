export interface School {
    name: string,
    about: string,
    visionMision: null,
    address: string,
    mediaId: null,
    telp: string,
    email: string,
    npsn: string,
    fb: string,
    ig: string,
    tiktok: string,
}

export interface GetConfigSchool {
    message: string,
    data: School
}
