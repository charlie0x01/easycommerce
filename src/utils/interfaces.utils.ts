export interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  verification_token: string;
  is_verified: boolean;
}
