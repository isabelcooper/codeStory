import {routes, Routing} from "http4js/core/Routing";
import {Method} from "http4js/core/Methods";
import {NativeHttpServer} from "http4js/servers/NativeHttpServer";
import {ResOf} from "http4js/core/Res";
import * as fs from "fs";
import {Req} from "http4js/core/Req";


export class Server {
  private server: Routing;
  constructor(private port: number = 1245) {

    this.server = routes(Method.GET, '/health', async () => ResOf(200))
      .withGet('/', async (): Promise<any> => {
        return ResOf(200, fs.readFileSync('./home.html').toString())
      })
      .withGet('/index/{path}',async (req: Req)=>{
        return ResOf(200, fs.readFileSync(`.${req.uri.asNativeNodeRequest.path}`).toString())
      })
      .asServer(new NativeHttpServer(this.port));
  }

  start() {
    this.server.start();
    console.log(`Server running on port ${this.port}`)
  }

  stop() {
    this.server.stop();
  }
}

