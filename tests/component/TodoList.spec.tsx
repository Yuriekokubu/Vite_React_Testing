import { test, expect } from '@playwright/test';

// regular page-based verification of todo list

test('can add items to the todo list (page)', async ({ page }) => {
  await page.goto('/');
  const todoInput = page.getByPlaceholder('สิ่งที่ต้องทำ');
  await expect(todoInput).toBeVisible();

  await todoInput.fill('ซื้ออาหาร');
  await page.getByRole('button', { name: /เพิ่ม/i }).click();
  await expect(page.getByText('ซื้ออาหาร')).toBeVisible();

  await todoInput.fill('อ่านหนังสือ');
  await page.getByRole('button', { name: /เพิ่ม/i }).click();
  await expect(page.getByText('อ่านหนังสือ')).toBeVisible();

  await expect(page.locator('ul > li')).toHaveCount(2);
});