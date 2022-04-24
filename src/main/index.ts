import * as dotenv from "dotenv";

import { SetupServer } from "@/main/server";

enum ExitStatus {
  Failure = 1,
  Sucess = 0
}

(async (): Promise<void> => {
  dotenv.config();

  try {
    const server = new SetupServer(Number(process.env.PORT));
    await server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    exitSignals.map(sig =>
      process.on(sig, async () => {
        try {
          console.log("App exited with sucess", sig);
          process.exit(ExitStatus.Sucess);
        } catch (error) {
          console.log("App exited with error:", error);
          // logger.error(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      })
    );
  } catch (error) {
    // logger.error(`App exited with error: ${error}`);
    //process.exit(ExitStatus.Failure);
  }
})();
