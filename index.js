import puppeteer from "puppeteer";
import { Telegraf } from "telegraf";

const bot = new Telegraf("327494434:AAFFHuQDsOvJPQGJNFjKtOO9FJTzjdojXtY");
const chatId = "262734264";
const url =
    "https://www.avito.ru/surgut/kvartiry/sdam/na_dlitelnyy_srok-ASgBAgICAkSSA8gQ8AeQUg?context=H4sIAAAAAAAA_0q0MrSqLraysFJKK8rPDUhMT1WyLrYyNLJSKk4sS02JL05NLErOULKuBQQAAP__IWhYLCkAAAA&f=ASgBAgECAkSSA8gQ8AeQUgFFxpoMGXsiZnJvbSI6MjAwMDAsInRvIjozMDAwMH0&i=1&s=104&user=1";

bot.launch();

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        args: [`--window-size=1920,1080`],
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(url);

    // await page.screenshot({ path: "screenshot.png" });

    let lastId = "";
    let count = 1;
    setInterval(async () => {
        const test = await page.$(".iva-item-root-_lk9K");
        const testLink = await page.$(".iva-item-root-_lk9K a");
        const currId = await page.evaluate((el) => el.getAttribute("id"), test);
        const link = await page.evaluate(
            (el) => el.getAttribute("href"),
            testLink,
        );

        if (currId !== lastId) {
            bot.telegram.sendMessage(chatId, `https://www.avito.ru${link}`);
            lastId = currId;
        }

        await page.screenshot({ path: `screenshot${count}.png` });

        await page.goto(url);

        count++;

        if (count > 10) count = 1;
        console.log(`Iteration number ${count}`);
    }, 60000);

    // await browser.close();
})();
