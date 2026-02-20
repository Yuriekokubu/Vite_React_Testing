import { test, expect } from '@playwright/test';

// changed to a regular page test since CT environment was problematic

test('App counter increments (page)', async ({ page }) => {
  await page.goto('/');
  const btn = page.getByRole('button', { name: /count is/i });
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(btn).toHaveText(/count is 1/i);
});
