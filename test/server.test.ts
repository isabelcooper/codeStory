import {Server} from "../src";
import {HttpClient} from "http4js/client/HttpClient";
import {ReqOf} from "http4js/core/Req";
import {Method} from "http4js/core/Methods";
import {expect} from "chai";

describe('Server', () => {

  it('should respond 200 on health', async () => {
    const port = 1245;
    let server = new Server(port);
    server.start();
    const httpClient = HttpClient;
    const response = await httpClient(ReqOf(Method.GET,`http://localhost:${port}/health`));
    expect(response.status).to.eql(200);
    server.stop();
  });
});