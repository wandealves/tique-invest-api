import * as dotenv from "dotenv";

import { SetupServer } from "./server";

(async (): Promise<void> => {
  dotenv.config();

  try {
    console.log("process.env.PORT", process.env.PORT);
    const server = new SetupServer(Number(process.env.PORT));
    await server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    exitSignals.map(sig =>
      process.on(sig, async () => {
        try {
          // await server.close();
          //logger.info(`App exited with sucess`);
          /// process.exit(ExitStatus.Sucess);
        } catch (error) {
          // logger.error(`App exited with error: ${error}`);
          //process.exit(ExitStatus.Failure);
        }
      })
    );
  } catch (error) {
    // logger.error(`App exited with error: ${error}`);
    //process.exit(ExitStatus.Failure);
  }
})();
