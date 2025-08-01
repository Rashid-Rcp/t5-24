import { UserBase } from "./user";
export type ClubFormData = {
    name: string;
    tagline: string;
    about: string;
    isPrivate: boolean;
    languages: string[]  ;
    interestingAreas: string[];
    coverImage?: File | string | null;
    profileImage?: File | string | null;
    contributors: UserBase[];
}

export type ClubFormDataValidation = {
  name: string;
  tagline: string;
  about: string;
  isPrivate: boolean;
  languages: string;
  interestingAreas: string;
  coverImage?:string | null;
  profileImage?: string | null;
  contributors?:'' ;
}

export type ClubData = {
  _id: string;
  name: string;
  tagline: string;
  about: string;
  isPrivate: boolean;
  languages: string[] | string  ;
  interestingAreas: string[] | string;
  coverImage?:  string | null;
  profileImage?:  string | null;
  contributors: UserBase[];
  createdAt: string;
  updatedDate?: string;
  deleteFlag: boolean;
  followers: string[];
}

export type ClubBase = {
  id: string;
  name: string;
}
