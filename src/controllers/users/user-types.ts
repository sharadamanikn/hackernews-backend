import type { User } from "../../generated/prisma/index.js";
<<<<<<< HEAD
=======

>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
export type GetMeResult = {
  user: User;
};

export enum GetMeError {
  BAD_REQUEST,
}

export type usersResult = {
  users: Array<User>;
  total: number;
};
export enum usersError {
  BAD_REQUEST,
}
