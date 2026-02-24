import { test, expect } from '@playwright/test';

// end-to-end check of the login form

test('successful login shows user name', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('user').fill('admin');
  await page.getByPlaceholder('password').fill('password');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText(/Logged in as admin/i)).toBeVisible();
});

test('invalid login alerts', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('user').fill('bad');
  await page.getByPlaceholder('password').fill('bad');

  // 1. สร้าง Promise เพื่อรอให้ Dialog ปรากฏขึ้นมาจริงๆ
  const dialogPromise = page.waitForEvent('dialog');

  // 2. สั่งกดปุ่ม Login
  await page.getByRole('button', { name: /login/i }).click();

  // 3. รอให้ Dialog เด้งออกมาแล้วกด Accept
  const dialog = await dialogPromise;
  await dialog.accept();

  // 4. ตรวจสอบผลลัพธ์
  await expect(page.getByText(/Logged in as/i)).toHaveCount(0);
});