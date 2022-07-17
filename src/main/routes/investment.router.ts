import { Router } from "express";

import { InvestmentController } from "../../presentation/controllers";
import { adaptterRoute } from "../adapters";

//import "../../shared/container";

export default (router: Router): void => {
  const controller = new InvestmentController();

  router.post("/investments", adaptterRoute(controller.post));
  router.get("/investments", adaptterRoute(controller.getAll));
};
