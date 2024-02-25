import { CorsOptions } from "cors";

const allowlist = [
  "http://localhost:5173",
  `https://app.wisecounsel.ai`,
  "https://app-dev.wisecounsel.ai",
];

/**
 * CORS config.
 */
const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowlist.indexOf(origin) !== -1 ||
      origin.endsWith(".wisecounsel.ai")
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS authorization failed."));
    }
  },
  credentials: true,
};

export default corsConfig;
