import {routes, Routing} from "http4js/core/Routing";
import {Method} from "http4js/core/Methods";
import {NativeHttpServer} from "http4js/servers/NativeHttpServer";
import {ResOf} from "http4js/core/Res";
import {Req} from "http4js/core/Req";
import {StaticFileReader} from "./StaticFileReader";

export class Server {
  private server: Routing;

  constructor(port: number = 1245, private fileReader = new StaticFileReader()) {

    this.server = routes(Method.GET, '/health', async () => ResOf(200))
      .withGet('/', async (): Promise<any> => {
        return ResOf(200, this.fileReader.read('./index/home', 'html'))
      })
      .withGet('/index/{path}', async (req: Req) => {
        const fileType = req.uri.path().split('.')[1];
        return ResOf(200, this.fileReader.read(`./index/${req.pathParams.path}`, fileType))
      })
      .asServer(new NativeHttpServer(port));
  }

  start() {
    this.server.start();
    // console.log(`Server running on port ${port}`)
  }

  stop() {
    this.server.stop();
  }
}

