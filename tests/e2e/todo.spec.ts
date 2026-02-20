import { test, expect } from '@playwright/test';

test('ผู้ใช้สามารถเพิ่มรายการ todo และเห็นมันบนหน้า', async ({ page }) => {
  await page.goto('/');

  const todoInput = page.getByPlaceholder('สิ่งที่ต้องทำ');
  await todoInput.fill('ไปวิ่ง');
  await page.getByRole('button', { name: /เพิ่ม/i }).click();
  await expect(page.getByText('ไปวิ่ง')).toBeVisible();

  await todoInput.fill('เขียนบล็อก');
  await page.getByRole('button', { name: /เพิ่ม/i }).click();
  await expect(page.getByText('เขียนบล็อก')).toBeVisible();

  const items = page.locator('ul > li');
  await expect(items).toHaveCount(2);
});