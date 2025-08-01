export type UserBase = {
  _id: string;
  username: string;
  profileImage?: string;
  // fullName?: string;
};

export type UserFormData = Omit<UserBase, '_id'> & {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  coverImage?: string;
  about?: string;
  socialLinks?: any[];
};

export type UserBasic = UserBase;

export type UserInfo = UserBase & {
  fullName: string;
  email: string;
  phone?: string;
  coverImage?: string;
  about?: string;
  socialLinks?: any[];
};


