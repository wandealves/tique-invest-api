import { Router } from "express";

import { UserController } from "../../presentation/controllers";
import { adaptRoute } from "../adapters";

export default (router: Router): void => {
  const controller = new UserController();

  router.post("/users", adaptRoute(controller.post));
  //router.get("/wallets", adaptRoute(controller.getAll));
};
