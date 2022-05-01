import { Router } from "express";

import { InvestmentController } from "@/presentation/controllers";

export default (router: Router): void => {
  const controller = new InvestmentController();

  router.post("/investments", controller.post);
  router.get("/investments", controller.getAll);
};
