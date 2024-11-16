import { Media } from "./media.interface";

  export interface Galeri {
    id: number;
    uuid: string;
    name: string;
    description: string;
    prioritas: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    media: Media[];
  }
  
  export interface GetAllGaleriResponse {
    status: number,
    message: string;
    data: Galeri[];
  }
  
  export interface GetDetailGaleriResponse {
    status: number;
    message: string;
    data: Galeri;
  }
  
  export interface ResponseActionGaleri {
    status: number;
    message: string;
  }
  