import request from "supertest";
import "reflect-metadata";

import { setupApp } from "../../../src/main/config/app";

describe("Content Type Middleware", () => {
  test("Should return default content type json", async () => {
    const app = await setupApp();

    app.get("/test_content_type", (req, res) => {
      res.send("");
    });

    await request(app).get("/test_content_type").expect("content-type", /json/);
  });
  test("Should return xml content type when forced", async () => {
    const app = await setupApp();

    app.get("/test_content_type_xml", (req, res) => {
      res.type("xml");
      res.send("");
    });

    await request(app).get("/test_content_type_xml").expect("content-type", /xml/);
  });
});
