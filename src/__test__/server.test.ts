/**
 * @jest-environment node
 */

import { Enforcer } from "../index";
import TestServer from "./server";

describe("Communication with server", () => {
  let server: TestServer;
  beforeAll(() => {
    server = new TestServer();
    server.start();
  });

  test("Get data from server", async () => {
    const enforcer = new Enforcer("http://localhost:4000");
    const data = await enforcer.getData();
    expect(data).toBe("this is the data");
  });

  afterAll(() => server.terminate());
});
