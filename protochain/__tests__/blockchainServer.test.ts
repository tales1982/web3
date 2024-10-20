import request from "supertest";
import { describe, test, expect, jest } from "@jest/globals";
import Block from '../src/lib/block';
import { app } from "../src/server/blockchainServer";

jest.mock("../src/lib/block");
jest.mock("../src/lib/blockchain");

describe("Blockchain Server tests", () => {

  test("GET /status", async () => {
    const response = await request(app).get("/status");
    expect(response.status).toEqual(200);
    expect(response.body.numberOfBlocks).toEqual(1);
    //  expect(response.body.isValid.success).toEqual(true);
  });

  test("GET /block/0", async () => {
    const response = await request(app).get("/block/0");
    expect(response.status).toEqual(200);
    expect(response.body.index).toEqual(0);
  });

  test("GET /block/1", async () => {
    const response = await request(app).get("/block/1");
    expect(response.status).toEqual(404);
  });

  test("GET /block/invalid", async () => {
    const response = await request(app).get("/block/invalid");
    expect(response.status).toEqual(404);
  });

  test("POST /blocks", async () => {
    const response = await request(app)
      .post("/blocks")
      .send({ data: "new block" });
    expect(response.status).toEqual(201);
    expect(response.body.index).toEqual(0);
  });

  test("POST /blocks (invalid)", async () => {
    const response = await request(app)
      .post("/blocks")
      .send({ invalid: "new block" });
    expect(response.status).toEqual(422);
  });

  test("POST /blocks/ -Should NOT add block  (invalid)", async () => {
    const block = new Block({
        index: -1,
    } as Block);
    const response = await request(app)
      .post("/blocks")
      .send(block);

    expect(response.status).toEqual(400);
  });     
});
