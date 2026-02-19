import { test, expect } from '@playwright/test';

test('เปรียบเทียบเฉพาะรูปปุ่ม Counter', async ({ page }) => {
    await page.goto('/');
    
    // เลือกเฉพาะปุ่ม ไม่ต้องถ่ายทั้งหน้าจอ
    const counterBtn = page.getByRole('button', { name: /count is/i });

    await expect(counterBtn).toHaveScreenshot('counter-button.png');
});