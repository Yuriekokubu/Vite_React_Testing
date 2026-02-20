import { test, expect, devices } from '@playwright/test';

// skipping visual-fail because baseline images are gone
test.skip('เปรียบเทียบรูปโดยจงใจเปลี่ยนสีปุ่ม', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['iPhone 13'] });
    const page = await context.newPage();
    await page.goto('/');

    await page.evaluate(() => {
        document.body.style.backgroundColor = 'pink'; 
    });

    await expect(page).toHaveScreenshot('home-mobile.png');
    await context.close();
});