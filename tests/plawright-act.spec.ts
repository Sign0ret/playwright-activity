import { test, expect, firefox, chromium } from '@playwright/test';

test('Act 3: browsers and browser context', async () => {
  const browser = await firefox.launch({ headless: false, slowMo: 50 });
  console.log(browser.contexts().length);
  const context = await browser.newContext();
  console.log(browser.contexts().length);
  const page = await context.newPage();
  await page.goto('https://playwright.dev/');
  await page.waitForTimeout(5000);
  await context.close();
  await browser.close();
});

test.describe('Act 4: multiple pages', () => {
  test('chromium', async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto('https://playwright.dev/docs/intro');
    await page1.waitForTimeout(5000);
    const page2 = await context.newPage();
    await page2.goto('https://playwright.dev/docs/writing-tests');
    await page2.waitForTimeout(5000);
    const allPages = context.pages();
    console.log("amount of pages: ",allPages.length);
    expect(allPages.length).toBe(2);
    await context.close();
    await browser.close();
  });
});