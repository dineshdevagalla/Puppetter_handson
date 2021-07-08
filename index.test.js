const puppeteer = require("puppeteer");

const chromium = require("chrome-aws-lambda");
const expect = require("chai").expect;
const dir = "/tmp/";

const url = "http://127.0.0.1:8081/";


let requestUrl = "";

const openTab = async (browser, url) => {
  let page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setRequestInterception(true);
  page.on("request", (request) => {
     request.continue();
  });
  await page.goto(url, { waitUntil: "networkidle0" });
    await page.setViewport({
      width:  767,
      height: 992
    });
  return page;
};

let testBrowser = null;

const openBrowser = async () => {
  const disableBackgroudNetworkArg = "--disable-background-networking";
  const chromeArgs = [...chromium.args];
  const disableBackgroudNetworkArgIndex = chromeArgs.indexOf(
    disableBackgroudNetworkArg
  );
  chromeArgs.splice(disableBackgroudNetworkArgIndex, 1);

  const browser = await chromium.puppeteer.launch({
    args: chromeArgs,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  return browser;
};

describe("test suite", () => {
  it("should test fetch call on reset", async () => {
     testBrowser = await openBrowser();
     const page = await openTab(testBrowser, url);
      const hamburgerMenuContainer =await page.waitForFunction(`document.querySelector("i.fa-bars").parentElement`);
      const computedStyles = await hamburgerMenuContainer.evaluate(
        (hamburgerMenuContainer) => {
          return getComputedStyle(hamburgerMenuContainer).getPropertyValue(
            "display"
          );
        }
      );
     expect(computedStyles).to.equal("flex");
  }, 11000)
});
