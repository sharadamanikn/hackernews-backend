import { betterAuth } from "better-auth";
import { betterAuthSecret, serverUrl, webClientUrl } from "../../environment.js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "../prisma/index.js";
import {username} from "better-auth/plugins";

const betterAuthServerClient = betterAuth({
  baseURL: serverUrl,
  trustedOrigins: [webClientUrl],
  secret: betterAuthSecret,
  plugins:[username()],
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),
  user: {
    modelName: "User",
  },
  session: {
    modelName: "Session",
  },
  account: {
    modelName: "Account",
  },
  verification: {
    modelName: "Verification",
  },
  emailAndPassword: {
    enabled: true,
  },
});

export default betterAuthServerClient;