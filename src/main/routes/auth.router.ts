import { Router } from "express";

import { AuthController } from "../../presentation/controllers";
import { adaptRoute } from "../adapters";

export default (router: Router): void => {
  const controller = new AuthController();

  router.post("/auths", adaptRoute(controller.post));
  //router.get("/wallets", adaptRoute(controller.getAll));
};
