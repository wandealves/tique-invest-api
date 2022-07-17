import { Router } from "express";

import { UserController } from "../../presentation/controllers";
import { adaptterRoute } from "../adapters";

export default (router: Router): void => {
  const controller = new UserController();

  router.post("/users", adaptterRoute(controller.post));
  //router.get("/wallets", adaptRoute(controller.getAll));
};
