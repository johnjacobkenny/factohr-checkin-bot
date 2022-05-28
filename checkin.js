const usernameSelector = "#txtUsername";
const passwordSelector = "#txtPassword";

const login = async (page, username, password) => {
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
}

const punchIn = async (page) => {
    let response = null;

    await page.goto("https://app2.factohr.com/matter/site/Attendance/OnlineAttendance.aspx")
    const checkIn = await page.waitForSelector("#ctl00_CPH_btnCheck")
    await checkIn?.click()

    const checkInMessage = await page.waitForSelector("#messagebox-1001-body")
    if (checkInMessage)
        response = await checkInMessage.evaluate(el => el.textContent)
    else
        response = "Something went wrong"

    return response;
}

module.exports = {
    punchIn,
    login
}