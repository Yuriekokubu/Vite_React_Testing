import { test, expect, devices } from '@playwright/test';

test('เปรียบเทียบรูปโดยจงใจเปลี่ยนสีปุ่ม', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['iPhone 13'] });
    const page = await context.newPage();
    await page.goto('/');

    // เปลี่ยนสีพื้นหลังเป็นชมพูเพื่อดูความต่าง
    await page.evaluate(() => {
        document.body.style.backgroundColor = 'pink'; 
    });

    // ใช้ชื่อเดียวกับรูปเดิมที่คุณมี หรือตั้งใหม่
    await expect(page).toHaveScreenshot('home-mobile.png');
    await context.close();
});