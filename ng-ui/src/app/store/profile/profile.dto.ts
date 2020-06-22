export class Profile {
  userId: string; // Venko userId
  fullName: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  nickName: string;
  userType: string;
  email: string;
}

export class Users {
  users: Profile[];
}
