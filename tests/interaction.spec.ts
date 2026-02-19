import { test, expect } from '@playwright/test';

test('ทดสอบปุ่ม Counter และการเปลี่ยนแปลงค่า', async ({ page }) => {
  await page.goto('/');

  const counterBtn = page.getByRole('button', { name: /count is/i });
  
  // เริ่มต้นควรเป็น 0
  await expect(counterBtn).toContainText('0');

  // กดปุ่ม 3 ครั้ง
  await counterBtn.click();
  await counterBtn.click();
  await counterBtn.click();

  // ค่าต้องเปลี่ยนเป็น 3
  await expect(counterBtn).toContainText('3');
});

test('ทดสอบการกรอกฟอร์ม (ถ้ามี)', async ({ page }) => {
  await page.goto('/');
  
  // ลูกเล่น: ค้นหาด้วย Placeholder และพิมพ์ข้อมูล
  const input = page.getByPlaceholder('ชื่อผู้ใช้งาน');
  if (await input.isVisible()) {
    await input.fill('Yuriekokubu');
    await expect(input).toHaveValue('Yuriekokubu');
  }
});