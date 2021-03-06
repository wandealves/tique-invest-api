import request from "supertest";
import "reflect-metadata";

import { setupApp } from "../../../src/main/config/app";

describe("Body Parser Middleware", () => {
  test("Should parse body as json", async () => {
    const app = await setupApp();

    app.post("/test_body_parser", (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post("/test_body_parser")
      .send({ name: "test" })
      .expect({ name: "test" });
  });
});
