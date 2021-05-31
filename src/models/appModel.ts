export interface LoginForm {
  username: string;
  password: string;
}

export interface User {
  exp: number;
  firstName: string;
  jti: string;
  lastName: string;
  orgId: number;
  orgName: string;
  roles: string;
  sub: string;
  userId: 1;
}
