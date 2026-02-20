import { test, expect, devices } from '@playwright/test';

test('หน้าเว็บต้องแสดงผลสวยงามบน iPhone 13', async ({ browser, browserName }) => {
    // เพิ่มบรรทัดนี้: ถ้าไม่ใช่ chromium ให้ข้ามไปเลย เพราะ Firefox/Webkit อาจมีปัญหากับ isMobile
    test.skip(browserName !== 'chromium', 'Mobile simulation is best supported on Chromium');

    const context = await browser.newContext({
        ...devices['iPhone 13'],
    });
    const page = await context.newPage();
    await page.goto('/');

    // ตรวจสอบว่าองค์ประกอบหลักปรากฏบนอุปกรณ์มือถือ
    await expect(page.getByRole('heading', { name: /Vite \+ React/i })).toBeVisible();
    await context.close();
});