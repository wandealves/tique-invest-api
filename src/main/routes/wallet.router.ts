import { Router } from "express";

import { WalletController } from "../../presentation/controllers";
import { adaptRoute } from "../adapters";
import { isAuthorized } from "../middlewares";

export default (router: Router): void => {
  const controller = new WalletController();

  router.post("/wallets", isAuthorized, adaptRoute(controller.post));
  router.get("/wallets", isAuthorized, adaptRoute(controller.getAll));
};
