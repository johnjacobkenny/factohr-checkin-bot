'use strict';

/* eslint-disable no-unused-vars */

const functions = require('@google-cloud/functions-framework');
const p = require("puppeteer");

/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http('factoHRCheckin', async (req, res) => {
  const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-gpu',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];
  let message = "";
  const username = req.body.username;
  const password = req.body.password;

  if (username == null || password == null) {
    return res.send("Please enter username or password.") 
  }

  try {
    const usernameSelector = "#txtUsername";
    const passwordSelector = "#txtPassword";

    const attendanceSelector = '[data-module-name="Attendance"]';
    const browser = await p.launch({args: minimal_args})
    const page = await browser.newPage()

    await page.goto("https://app2.factohr.com/matter/Security/Login")
    await page.waitForTimeout(1000)

    await page.waitForSelector(usernameSelector)
    await page.waitForSelector(passwordSelector)
    await page.click(usernameSelector)
    await page.keyboard.type(username)

    await page.click(passwordSelector)
    await page.keyboard.type(password)

    await page.click("#btnLogin")
    await page.waitForNavigation()

    await page.goto("https://app2.factohr.com/matter/site/Attendance/OnlineAttendance.aspx")
    const checkIn = await page.waitForSelector("#ctl00_CPH_btnCheck")
    await checkIn?.click()

    const checkInMessage = await page.waitForSelector("#messagebox-1001-body")
    if (checkInMessage) {
      message = await checkInMessage.evaluate(el => el.textContent)
    }

    await page.close()
  }
  catch (err) {
    console.log(err)
  }
  res.send(message);
});