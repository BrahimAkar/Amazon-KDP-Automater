const fs = require("fs").promises;
const uniqueRandomArray = require("unique-random-array");
const puppeteer = require("puppeteer");
const randomInt = require("random-int");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
async function GetJobs() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.setDefaultTimeout(0);

  // ! Go to website
  await page.goto(
    // "https://kdp.amazon.com/en_US/title-setup/paperback/new/details?ref_=kdp_BS_D_cr_ti"
    "https://dot-job-descriptions.careerplanner.com/"
  );
  await page.waitFor(randomInt(1298, 1419));

  randomInt(298, 819);
  const xpath_expression =
    "//a[contains(@href,'https://DOT-Job-Descriptions.careerplanner.com')]";
  await page.waitForXPath(xpath_expression);
  const links = await page.$x(xpath_expression);
  const link_urls = await page.evaluate((...links) => {
    return links.map((e) => e.textContent);
  }, ...links);

  jobsObj = [];
  link_urls.forEach((el) => {
    jobsObj.push({
      JobName: el,
    });
  });

  console.log(jobsObj);
  fs.writeFile("./1.json", JSON.stringify(jobsObj));
}

GetJobs();
