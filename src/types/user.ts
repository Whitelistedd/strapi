import { cartProductType } from "./cartProduct";

export type userType = {
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: boolean;
  blocked: boolean;
  role: string;
  products?: cartProductType[];
  id: number;
};
