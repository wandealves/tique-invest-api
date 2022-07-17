import { Router } from "express";

import { WalletController } from "../../presentation/controllers";
import { adaptterRoute } from "../adapters";
import { isAuthorized } from "../middlewares";

export default (router: Router): void => {
  const controller = new WalletController();

  router.post("/wallets", isAuthorized, adaptterRoute(controller.post));
  router.get("/wallets/:id", isAuthorized, adaptterRoute(controller.get));
};
