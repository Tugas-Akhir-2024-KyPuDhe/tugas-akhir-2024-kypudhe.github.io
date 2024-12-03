import { Media } from "./media.interface"

export interface School {
    id?: number,
    name: string,
    about: string,
    vision: string,
    mission: string,
    address: string,
    maps: string,
    mediaId: null,
    telp: string,
    email: string,
    npsn: string,
    fb: string,
    ig: string,
    tiktok: string,
    youtube: string,
    logo?: Media
}

export interface GetConfigSchool {
    message: string,
    data: School
}

export interface ResponseUpdateSchool {
    message: string,
    status: number
}
