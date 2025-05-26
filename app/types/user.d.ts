export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserWithPassword extends User {
  password: string;
}
