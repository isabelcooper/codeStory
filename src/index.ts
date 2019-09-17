import {routes, Routing} from "http4js/core/Routing";
import {Method} from "http4js/core/Methods";
import {NativeHttpServer} from "http4js/servers/NativeHttpServer";
import {ResOf} from "http4js/core/Res";

export class Server {

  private server: Routing;

  constructor(port: number) {

    this.server = routes(Method.GET, '/health', async () => ResOf(200))
      .asServer(new NativeHttpServer(port));
  }


  start() {
    this.server.start();
  }

  stop() {
    this.server.stop();
  }
}