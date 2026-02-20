import { test, expect } from '@playwright/test';

// simple smoke check against production build

test('production build serves index and counter works', async ({ page }) => {
  await page.goto('/');
  const btn = page.getByRole('button', { name: /count is/i });
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(btn).toHaveText(/count is 1/i);
});