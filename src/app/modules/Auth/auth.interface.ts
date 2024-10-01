
export type TSignup = {
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    bio?: string;
    memberStatus: {
      status: 'premium' | 'non-premium';
      expiresIn?: Date;
    };
    followers: number;
    following: number;
    role: "admin" | "user";
    userStatus: "active" | "blocked";
    isDeleted: boolean;
  }

  export type TLogin = {
    email: string;
    password: string;
  }


  export type TUserRoles = "user" | "admin";
