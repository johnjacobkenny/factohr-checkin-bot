const p = require("puppeteer");

(async () => {
    try {
        const usernameSelector = "#txtUsername";
        const passwordSelector = "#txtPassword";
        const username = "MMW2021076";
        const password = "8qrPfm5siAnssc";

        const attendanceSelector = '[data-module-name="Attendance"]';
        // const browser = await p.launch({ headless: true, slowMo: 10 })
        const browser = await p.launch()
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
            const value = await checkInMessage.evaluate(el => el.textContent)
            console.log(value)
        }

        await page.close()
        // working navigation till the punch in page
        // await page.waitForFunction("addNewTab != null")

        // await page.evaluate(() => {
        //     addNewTab(this, '/site/Attendance/OnlineAttendance.aspx', 'Online Attendance', true)
        // })

        // await page.waitForNavigation({ waitUntil: 'networkidle0' })
        // const checkIn = await page.waitForSelector("#ctl00_CPH_btnCheck")

        // await checkIn?.click()

        // await page.waitForSelector("#ctl00_CPH_btnCheck")
        // await page.click("#ctl00_CPH_btnCheck")
        // try {
        //     const [checkInButton] = await page.$x("//span[contains(text(), 'Online Punch')]");
        //     await checkInButton.click()
        // }
        // catch (err) {
        //     console.log(err)
        // }
        // await page.waitForTimeout(5000)

        // await page.hover("[data-module='Attendance']")

        // await page.waitForSelector(attendanceSelector);
        // const btnAction = await page.$(attendanceSelector);

        // await btnAction.click()

        // await page.waitForTimeout(1000)
        // try {
        //     await page.evaluate(() => {
        //         gotoPage('/Attendance/OnlineAttendance.aspx', 'Online Attendance');
        //         console.log("this is run");
        //     })
        // } catch (err) {
        //     console.log(err);
        // }

    }
    catch (err) {
        console.log(err)
    }

})()