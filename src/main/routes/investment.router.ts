import { Router } from "express";

import { InvestmentController } from "../../presentation/controllers";
import { adaptRoute } from "../adapters";

import "../../shared/container";

export default (router: Router): void => {
  const investmentController = new InvestmentController();

  router.post("/investments", adaptRoute(investmentController.post));
  router.get("/investments", adaptRoute(investmentController.getAll));
};
