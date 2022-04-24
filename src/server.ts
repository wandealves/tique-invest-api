import { Server } from "@overnightjs/core";
import express from "express";
import cors from "cors";

import { InvestmentController } from "./presentation/controllers";

export class SetupServer extends Server {
  constructor(private port: number = 3333) {
    super();
  }
  public start(): void {
    console.log("this.port", this.port);
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
      // logger.info('Server listening of port', this.port);
    });
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setupControllers(): void {
    const investmentController = new InvestmentController();

    this.addControllers([investmentController]);
  }
}
