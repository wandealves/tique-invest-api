import * as dotenv from "dotenv";
import "reflect-metadata";

import { server } from "./server";
//   "test": "jest --passWithNoTests --runInBand --no-cache",
enum ExitStatus {
  Failure = 1,
  Sucess = 0
}

(async (): Promise<void> => {
  dotenv.config();

  try {
    await server(Number(process.env.PORT || 3333));
  } catch (error) {
    console.log(`App exited with error: ${error}`);
    //process.exit(ExitStatus.Failure);
  }
})();
