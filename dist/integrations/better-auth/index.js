import { betterAuth } from "better-auth";
import { betterAuthSecret, serverUrl, webClientUrl } from "../../environment.js";
import { prismaAdapter } from "better-auth/adapters/prisma";
<<<<<<< HEAD
import { prismaClient } from "../prisma/index.js";
import { username } from "better-auth/plugins";
=======
// import { prismaClient } from "../prisma";
import { username } from "better-auth/plugins";
import { prismaClient } from "../prisma/index.js";
>>>>>>> 3ee32c9e115eef18f9a1288e7b4335f661275626
const betterAuthServerClient = betterAuth({
    baseURL: serverUrl,
    trustedOrigins: [webClientUrl],
    secret: betterAuthSecret,
    plugins: [username()],
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
