'use strict';

/* eslint-disable no-unused-vars */
const { chrome_args } = require("./chrome")
const functions = require('@google-cloud/functions-framework');
const p = require("puppeteer");
const { login, punchIn } = require("./checkin")


functions.http('factoHRCheckin', async (req, res) => {
  let response = null;
  const username = req.body.username;
  const password = req.body.password;

  if (username == null || password == null) {
    return res.send("Please enter username or password.")
  }

  try {
    const browser = await p.launch({ args: chrome_args })
    const page = await browser.newPage()

    await login(page, username, password)
    response = await punchIn(page)
    await page.close()
  }
  catch (err) {
    console.log(err)
  }
  res.send(response);
});