import { test, expect } from '@playwright/test';

test('หน้าแรกต้องแสดงชื่อโปรเจกต์และลิงก์ที่ถูกต้อง', async ({ page }) => {
  await page.goto('/');

  // 1. เช็คหัวข้อหลัก
  await expect(page.getByRole('heading', { name: /Vite \+ React/i })).toBeVisible();

  // 2. แก้ไข Locator ให้ตรงกับหน้าจอจริง (ใช้ชื่อ "React logo")
  const reactLogoLink = page.getByRole('link', { name: /react logo/i });
  
  // ตรวจสอบว่าลิงก์เชื่อมไปยัง URL ที่ถูกต้องหรือไม่
  await expect(reactLogoLink).toHaveAttribute('href', 'https://react.dev');
});