import { Router } from "express";

import { InvestmentController } from "@/presentation/controllers";
import { adaptRoute } from "@/main/adapters";

export default (router: Router): void => {
  const controller = new InvestmentController();

  router.post("/investments", adaptRoute(controller.post));
  //router.get("/investments", controller.getAll);
};
