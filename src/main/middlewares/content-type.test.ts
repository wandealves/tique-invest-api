import request from "supertest";
import { setupApp } from "../config/app";

describe("Content Type Middleware", () => {
  test("Should return default content type json", async () => {
    const app = await setupApp();

    app.get("/test_content_type", (req, res) => {
      res.send("");
    });

    await request(app).get("/test_content_type").expect("content-type", /json/);
  });
});
