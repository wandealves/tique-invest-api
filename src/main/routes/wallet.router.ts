import { Router } from "express";

import { WalletController } from "../../presentation/controllers";
import { adaptRoute } from "../adapters";

export default (router: Router): void => {
  const controller = new WalletController();

  router.post("/wallets", adaptRoute(controller.post));
  router.get("/wallets", adaptRoute(controller.getAll));
};
