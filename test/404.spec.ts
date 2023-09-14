import { test, expect } from '@playwright/test';

test('should have a 404 page', async ({ page }) => {
  await page.goto('/404', { waitUntil: 'networkidle' });
  await expect(page.locator('h2').first()).toContainText('404');
});
