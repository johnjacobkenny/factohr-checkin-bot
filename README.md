# FactoHR Punch In Automation using Puppeteer and Google Cloud

This project is used to automate the checkin flow in FactoHR. This is required because of the bad UX requiring 3 or 4 clicks to checkin. Right now this is targeting the Matter domain, but you can customize the URL in `checkin.js:5` and `checkin.js:23` to fit your use case.

## Publish to google cloud
`npm run publish`

## How to use
Once you publish the cloud function, this will give you a URL for it. You can send a post request to that URL with the following JSON body,
```
{
    "username": "...",
    "password": "..."
}
```

## Future
Take a look at these packages for future,
```
   "puppeteer-extra": "^3.1.9",
   "puppeteer-extra-plugin-adblocker": "^2.11.3",
   "puppeteer-extra-plugin-anonymize-ua": "^2.2.8",
   "puppeteer-extra-plugin-block-resources": "^2.2.4",
   "puppeteer-extra-plugin-stealth": "^2.4.9"
```