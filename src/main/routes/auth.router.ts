import { Router } from "express";

import { AuthController } from "../../presentation/controllers";
import { adaptterRoute } from "../adapters";

export default (router: Router): void => {
  const controller = new AuthController();

  router.post("/auths", adaptterRoute(controller.post));
  //router.get("/wallets", adaptRoute(controller.getAll));
};
