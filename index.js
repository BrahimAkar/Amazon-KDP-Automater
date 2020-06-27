const fs = require("fs").promises;
const uniqueRandomArray = require("unique-random-array");
const puppeteer = require("puppeteer");
const randomInt = require("random-int");

async function runIt() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // ! Import cookies
  const cookiesString = await fs.readFile("./cookies.json");
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);
  await page.setDefaultTimeout(0);

  // ! Go to kdp dashboard
  await page.goto(
    // "https://kdp.amazon.com/en_US/title-setup/paperback/new/details?ref_=kdp_BS_D_cr_ti"
    "https://kdp.amazon.com/en_US/title-setup/paperback/new/details?ref_=kdp_BS_D_cr_ti"
  );
  await page.waitFor(randomInt(1298, 1419));

  // ! Title
  await page.click("#data-print-book-title");
  randomInt(1298, 2419);
  await page.type("#data-print-book-title", "Hi I'M TITLE", {
    delay: 120,
  });

  // ! Subtitle
  randomInt(1298, 1419);
  await page.click("#data-print-book-subtitle");
  randomInt(298, 419);
  await page.type("#data-print-book-subtitle", "Hi I'M A SUBTITLE", {
    delay: 120,
  });

  // ! First name
  randomInt(298, 519);
  await page.click("#data-print-book-primary-author-first-name");
  randomInt(28, 191);
  await page.type(
    "#data-print-book-primary-author-first-name",
    "Hi I'M A FIRST NAME",
    { delay: 120 }
  );

  // ! Last name
  randomInt(298, 419);
  await page.click("#data-print-book-primary-author-last-name");

  randomInt(298, 819);
  await page.type(
    "#data-print-book-primary-author-last-name",
    "HY I'M A LAST NAME",
    {
      delay: 120,
    }
  );

  // ! Description
  randomInt(118, 719);
  await page.click("#data-print-book-description");
  randomInt(192, 619);
  await page.type("#data-print-book-description", "Hi I'M A DESCRIPTION", {
    delay: 120,
  });

  // ! Select no public domain
  await page.waitFor(randomInt(1298, 8419));
  await page.click("#non-public-domain", {
    delay: 25,
  });

  // !  SUBTITLE 1
  await page.waitFor(randomInt(2000, 3555));
  await page.click("#data-print-book-keywords-0");
  await page.type("#data-print-book-keywords-0", "HY I'M A SUBTITLE 1", {
    delay: randomInt(150, 250),
  });

  // !  SUBTITLE 2
  await page.waitFor(randomInt(2000, 3555));
  await page.click("#data-print-book-keywords-1");
  await page.type("#data-print-book-keywords-1", "HY I'M A SUBTITLE 2", {
    delay: randomInt(150, 250),
  });

  // !  SUBTITLE 3
  await page.waitFor(randomInt(2000, 3555));
  await page.click("#data-print-book-keywords-2");
  await page.type("#data-print-book-keywords-2", "HY I'M A SUBTITLE 3", {
    delay: randomInt(150, 250),
  });

  // !  SUBTITLE 4
  await page.waitFor(randomInt(2000, 3555));
  await page.click("#data-print-book-keywords-3");
  await page.type("#data-print-book-keywords-3", "HY I'M A SUBTITLE 4", {
    delay: randomInt(150, 250),
  });

  // !  SUBTITLE 5
  await page.waitFor(randomInt(2000, 3555));
  await page.click("#data-print-book-keywords-4");
  await page.type("#data-print-book-keywords-4", "HY I'M A SUBTITLE 5", {
    delay: randomInt(150, 250),
  });

  // !  SUBTITLE 6
  await page.waitFor(randomInt(2000, 3555));
  await page.click("#data-print-book-keywords-5");
  await page.type("#data-print-book-keywords-5", "HY I'M A SUBTITLE 6", {
    delay: randomInt(150, 250),
  });

  // !  SUBTITLE 7
  await page.waitFor(randomInt(2000, 3555));
  await page.click("#data-print-book-keywords-6");
  await page.type("#data-print-book-keywords-6", "HY I'M A SUBTITLE 7", {
    delay: randomInt(150, 250),
  });

  // ! Categories
  await page.click("#data-print-book-categories-button-proto-announce");
  await page.waitFor(5000);
  await page.waitFor(randomInt(5000, 5222));

  // ! Expand all links
  await page.$$eval("#category-chooser-popover .a-link-normal", (links) =>
    links.forEach((link) => link.click())
  );
  await page.waitFor(2000);
  await page.click("#data-print-book-categories-button-proto-announce");
  await page.click("#unsaved-changes-cancel-announce");
  await page.waitFor(25000);

  // ! Select the excact categories
  await page.$$eval(".a-label", (links) =>
    links.forEach((el) => {
      el.textContent === "Global Warming & Climate Change" ? el.click() : true;
      el.textContent === "Meteorology & Climatology" ? el.click() : true;
    })
  );
  // * Click save
  await page.waitFor(5000);
  await page.$$eval(".a-button-input", (elements) => elements[4].click());

  // ! Adult RadioButton
  await page.waitFor(randomInt(2000, 3000));
  await page.$$eval(".jele-override-input-width-radio input", (elements) =>
    elements[0].click()
  );

  // ! Save first page and continue
  await page.waitFor(randomInt(2000, 3000));
  await page.click("#save-and-continue-announce");

  // ! Get Free ISBN
  await page
    .waitForFunction(
      "document.querySelector('#free-print-isbn-btn-announce') && document.querySelector('#free-print-isbn-btn-announce').clientHeight != 0"
    )
    .then(() => console.log("got it!"));
  await page.click("#free-print-isbn-btn-announce");
  await page.waitFor(randomInt(1000, 2000));
  await page.click("#print-isbn-confirm-button-announce");
  await page.waitFor(randomInt(4000, 5000));

  // ! Upload Interior
  const inputUploadHandle = await page.$(
    "#data-print-book-publisher-interior-file-upload-AjaxInput"
  );
  let fileToUpload = "./pdf/inside.pdf";
  inputUploadHandle.uploadFile(fileToUpload);

  // ! Check if interior uploading is started
  await page
    .waitForXPath("//*[@class='success-header' and contains(., 'inside.pdf')]")
    .then((res) => console.log("Upload your interior process is started ✅"));

  // ! Check if interior processing is started
  await page
    .waitForXPath(
      "//*[@id='data-print-book-publisher-interior-file-upload-success' and contains(., 'Processing your file...')]"
    )
    .then((res) => console.log("Processing your interior is started... ✅"));

  // ! Check if interior processing is finished
  await page
    .waitForFunction(
      () =>
        document.querySelector(
          "#data-print-book-publisher-interior-file-upload-success > div > div"
        ).innerHTML === ""
    )
    .then((res) => console.log("your interior processing is finished ✅"));
  await page.waitFor(randomInt(2512, 3211));

  // ! Upload Cover
  await page
    .$$eval(
      "#data-print-book-publisher-cover-choice-accordion > div.a-box.a-last > div > div.a-accordion-row-a11y > a > i",
      (elements) => elements[0].click()
    )
    .then((el) => console.log("Upload your cover process is started ✅"));
  const CoverUploadHandle = await page.$(
    "#data-print-book-publisher-cover-file-upload-AjaxInput"
  );
  let coverFile = "./pdf/cover.pdf";
  CoverUploadHandle.uploadFile(coverFile);

  // ! Check if interior processing is started
  await page
    .waitForXPath(
      "//*[@id='data-print-book-publisher-cover-file-upload-success' and contains(., 'Processing your file...')]"
    )
    .then((res) => console.log("Processing your cover is started... ✅"));

  // ! Check if interior processing is finished
  await page
    .waitForFunction(
      () =>
        document.querySelector(
          "#data-print-book-publisher-cover-file-upload-success > div > div"
        ).innerHTML === ""
    )
    .then((res) => console.log("Your cover processing is finished 😎"));
  await page.waitFor(randomInt(5900, 6211));

  // ! Click Preview
  await page
    .click("#print-preview-noconfirm-announce")
    .then((res) => console.log("Click Preview"));
  await page
    .waitForFunction(() => document.querySelector(".coverSpine"))
    .then((res) => console.log("Your cover preview is fully loaded 😎"));

  await page.waitFor(randomInt(5500, 6500));

  // ! Click Save
  await page
    .click(" #printpreview_approve_button_enabled a")
    .then((res) => console.log("Click Save"));

  // ! Go to third page
  await page
    .waitForFunction(
      "document.querySelector('#save-and-continue-announce') && document.querySelector('#save-and-continue-announce').clientHeight != 0"
    )
    .then(() => console.log("got it 2!"));

  await page
    .click("#save-and-continue-announce")
    .then((res) => console.log("Going to third page "));

  // ! Type a Price
  await page
    .waitForFunction(
      "document.querySelector('#data-pricing-print-us-price-input > input') && document.querySelector('#data-pricing-print-us-price-input > input').clientHeight != 0"
    )
    .then(() => console.log("got it 3!"));
  await page.evaluate(
    () =>
      (document.querySelector(
        "#data-pricing-print-us-price-input > input"
      ).value = "")
  );
  await page.type("#data-pricing-print-us-price-input > input", "99.99", {
    delay: 120,
  });
  await page.waitFor(5000);

  // ! Click Expanded Distribution
  await page.click("#data-pricing-print label > i");

  // ! Click save to draft
  await page.waitFor(2000);
  await page.click("#save-announce");

  await page
    .waitForFunction(() =>
      document.querySelector(
        "#data-pricing-print div.a-column.a-span3.a-span-last > div > div > span"
      )
    )
    .then((res) => console.log("Prices are okay!"));
  //
}

runIt();
