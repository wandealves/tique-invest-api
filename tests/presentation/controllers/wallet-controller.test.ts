import request from "supertest";
import "reflect-metadata";

import { createWalletDto } from "../../data/mock-data";
import { setupApp } from "../../../src/main/config/app";

describe("Controller Wallet", () => {
  test("Deve criar carteira de ativos", async () => {
    const app = await setupApp();

    app.get("/user", function (req, res) {
      res.status(200).json({ name: "john" });
    });

    /*await request(app)
      .post("/api/wallets")
      .send(createWalletDto)
      .expect({
        value: {
          id: 1,
          name: createWalletDto.name,
          currencyCode: createWalletDto.currencyCode,
          userId: createWalletDto.userId
        }
      });*/

   //const response = await request(app)
     // .get("/user")
      //.expect("Content-Type", /json/)
      //.expect("Content-Length", "15")
     // .expect(200);

      //const response = await request(app)
    //  .//get("/api/wallets")
      //.set('Accept', 'application/json');

      const response = await request(app)
      .post("/api/wallets")
      .send(createWalletDto)
      .set('Accept', 'application/json');

      console.log('response.body',response.body)
      console.log('value',response.body.value)

      const result = response.body.value
      expect(result.id).toEqual(1);


   // console.log("response"), response;
  });
});
