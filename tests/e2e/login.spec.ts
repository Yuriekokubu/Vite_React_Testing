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
  // override the alert so it doesn't block
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByText(/Logged in as/i)).toHaveCount(0);
});