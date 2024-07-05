const request = require("supertest");
const { app } = require("../src/app");

describe("Testing First Ever API", () => {
  // server should return "Welcome to EasyCommerce!"
  test("Get Request Test", async () => {
    expect.assertions(2);
    const response = await request(app).get("/").send();
    expect(response?._body?.success).toEqual(true);
    expect(response?.status).toEqual(200)
  });
});
