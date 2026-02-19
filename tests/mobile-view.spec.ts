import { test, expect, devices } from '@playwright/test';

test('หน้าเว็บต้องแสดงผลสวยงามบน iPhone 13', async ({ browser }) => {
    // สร้าง Context จำลอง iPhone 13
    const context = await browser.newContext({
        ...devices['iPhone 13'],
    });
    const page = await context.newPage();

    await page.goto('/');

    // ลูกเล่น: ถ่ายรูปหน้าจอเก็บไว้เทียบ (Visual Comparison)
    // ครั้งแรกที่รันจะสร้างรูปต้นฉบับ ถ้าครั้งหน้า UI เพี้ยน เทสจะพังทันที
    await expect(page).toHaveScreenshot('home-mobile.png');

    await context.close();
});