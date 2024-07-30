import { userType } from "@/types/user";

export type userStateType = {
  user: userType | null;
  loading: boolean;
};
