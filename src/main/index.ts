import * as dotenv from "dotenv";

import { server } from "@/main/server";

enum ExitStatus {
  Failure = 1,
  Sucess = 0
}

(async (): Promise<void> => {
  dotenv.config();

  try {
    await server(Number(process.env.PORT));
  } catch (error) {
    // logger.error(`App exited with error: ${error}`);
    //process.exit(ExitStatus.Failure);
  }
})();
