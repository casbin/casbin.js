import axios from "axios";
import { Enforcer } from "../index";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("Mock functions", async () => {
  const resp = { data: { message: "ok", data: "123123" } };
  // Specify the returned data of the mockedAxios once
  mockedAxios.get.mockImplementationOnce(() => Promise.resolve(resp));
  const enforcer = new Enforcer("http://localhost:4000");
  const data = await enforcer.getData();
  expect(data).toBe("123123");
});
