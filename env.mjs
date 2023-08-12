import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    S3_ENDPOINT: z.string(),
    ACCESS_KEY_ID: z.string(),
    SECRET_ACCESS_KEY: z.string(),
  },
  runtimeEnv: {
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  },
});
