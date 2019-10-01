import {Server} from "../src/server";
import {HttpClient} from "http4js/client/HttpClient";
import {ReqOf} from "http4js/core/Req";
import {Method} from "http4js/core/Methods";
import {expect} from "chai";

describe('Server', () => {
  const httpClient = HttpClient;
  const port = 8181;
  const server = new Server(port);

  before(() => {
    server.start();
  });

  after(() => {
    server.stop();
  });

  it('should respond 200 on health', async () => {
    const response = await httpClient(ReqOf(Method.GET,`http://localhost:${port}/health`));
    expect(response.status).to.eql(200);
  });

  it('should load home js', async () => {
    const response = await httpClient(ReqOf(Method.GET,`http://localhost:${port}/index/home.js`));
    expect(response.status).to.eql(200);
  });
});