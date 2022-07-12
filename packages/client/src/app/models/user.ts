export enum UserRoleEnumeration {
  LOGGED_OFF = -1,
  ADMINISTRATOR = 1,
  MODERATOR = 2,
  REGULAR = 3,
}

export type AvailableRoles = Exclude<
  UserRoleEnumeration,
  UserRoleEnumeration.LOGGED_OFF
>;

export const userRoleTranslations = Object.freeze({
  [UserRoleEnumeration.ADMINISTRATOR]: "roles.administrator",
  [UserRoleEnumeration.REGULAR]: "roles.regular",
  [UserRoleEnumeration.MODERATOR]: "roles.moderator",
});

export const roleTranslationMapper = (roleId: AvailableRoles) => {
  return userRoleTranslations[roleId];
};

export type UserRole = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  surname: string;
  birthdata: Date;
  isBlocked: boolean;
  role: UserRole;
  userRoleId: number;
};

export type UsersRequest = {
  skip?: number;
  limit?: number;
  email?: string;
  name?: string;
  surname?: string;
};

export type UsersResponse = {
  users: User[];
};

export type CreateUserRequest = Partial<User>;
export type CreateUserResponse = {
  user: User;
};
export type UpdateUserResponse = {};
export type DeleteUserResponse = {};
