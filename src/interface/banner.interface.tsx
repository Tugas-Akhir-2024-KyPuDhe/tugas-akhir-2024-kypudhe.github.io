import { Media } from "./media.interface";

  export interface Banner {
    id: number;
    uuid: string;
    bannerId: string | null;
    title: string;
    description: string;
    title_link: string;
    link: string;
    prioritas: number;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    banner: Media;
  }
  
  export interface GetAllBannerResponse {
    message: string;
    status: number,
    data: Banner[];
  }

  export interface GetDetailBannerResponse {
    message: string;
    status: number;
    data: Banner;
  }
  
  export interface FormState {
    title: string;
    description: string;
    title_link: string;
    link: string;
    prioritas: string;
    status: string;
  }
  
  export interface ResponseActionBanner {
    status: number;
    message: string;
  }
  