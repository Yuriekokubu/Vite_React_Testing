import { test, expect } from '@playwright/test';

test('เปรียบเทียบเฉพาะรูปปุ่ม Counter', async ({ page }) => {
    await page.goto('/');
    
    // เลือกเฉพาะปุ่ม ไม่ต้องถ่ายทั้งหน้าจอ
    const counterBtn = page.getByRole('button', { name: /count is/i });

    // ตรวจสอบว่าปุ่มแสดงจำนวนเริ่มต้น
    await expect(counterBtn).toHaveText(/count is 0/i);
});