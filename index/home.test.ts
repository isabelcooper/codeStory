import {expect} from "chai";
import {Server} from "../src/server";
import * as puppeteer from "puppeteer";

describe('My test suite', function () {
  const server = new Server();
  let page;
  let browser;
  this.timeout(10000);
  server.start();

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:1245')

  });

  afterEach(async () => {
    await page.close();
    await browser.close();
  });

  after(async () =>{
    server.stop();
  });

  it('should work', async () => {
    expect(await page.title()).to.contain('Code Story')
  });

});

