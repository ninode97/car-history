export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: number;
  };
};
