import { defineConfig, devices } from '@playwright/test';
import react from '@vitejs/plugin-react';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    // ตั้งค่า Base URL ให้ตรงกับ Vite (ปกติคือพอร์ต 5173)
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  // สั่งให้ Playwright รัน Vite server ให้อัตโนมัติก่อนเริ่มเทส
  webServer: {
    // ใช้สคริปต์ที่รันทั้ง Auth (โหมดเทส) และ Vite พร้อมกัน
    command: 'concurrently "npm run start:auth:test" "vite"',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe', // แนะนำให้เปิดไว้เผื่อดู Log ถ้าเทสพัง
    stderr: 'pipe',
  },

  projects: [
    // end-to-end projects run against the running Vite app
    { name: 'e2e-chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'e2e-firefox', use: { ...devices['Desktop Firefox'] } },
    // webkit commented out: requires many extra deps not available in Github Actions
    // { name: 'e2e-webkit', use: { ...devices['Desktop Safari'] } },

    // component tests live under tests/component and use the same browser device
    {
      name: 'component-chromium',
      testDir: 'tests/component',
      use: { ...devices['Desktop Chrome'] },
    },
    // add more component projects as needed
    // production build tests (serve dist directory)
    {
      name: 'production',
      use: { ...devices['Desktop Chrome'] },
      webServer: {
        // start both the auth server and the static file server
        command: 'npm run serve:prod',
        url: 'http://localhost:4173',
        reuseExistingServer: !process.env.CI,
      },
    },],

  // port used by the component-test server (Vite)
  ctPort: 3100,
  // you can customize Vite configuration for CT if necessary
  ctViteConfig: {
    plugins: [
      // reuse the same react plugin as project
      react(),
    ],
  },
});