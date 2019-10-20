import * as fs from "fs";

export class StaticFileReader {
  public read(filePath: string, fileType: string): string {
    return fs.readFileSync(`${filePath}.${fileType}`).toString()
  }
}