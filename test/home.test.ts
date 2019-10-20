import {expect} from "chai";
import {Server} from "../src/server";
import puppeteer from 'puppeteer'

describe('Home page', function () {
  let server: Server;
  let page;
  let browser;
  this.timeout(10000);

  beforeEach(async () => {
    server = new Server();
    server.start();

    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:1245')
  });

  afterEach(async () => {
    await page.close();
    await browser.close();
    server.stop();
  });

  it('should load', async () => {
    expect(await page.title()).to.contain('Code Story')
  });

  it('should expand blocks on click', async () => {
    expect((await page.content()).match(/Building/g)[0]).to.contain('Building');
    expect(page).not.to.match(/details/);
    await page.click('#blocks');
    expect(await page.content()).to.match(/id="blocks-details" class="expanded">/);
  });

});

