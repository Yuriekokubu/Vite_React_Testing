import { test, expect } from '@playwright/test';

test('หน้าแรกต้องแสดงคำว่า Vite + React', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Vite + React')).toBeVisible();
});