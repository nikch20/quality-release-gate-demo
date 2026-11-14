const { test, expect } = require('@playwright/test');

test('shows the demo app heading', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(
    page.getByRole('heading', { name: 'Demo app is running' })
  ).toBeVisible();
});