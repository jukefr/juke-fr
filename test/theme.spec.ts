import { test, expect } from '@playwright/test';

import { handleToasts } from './utils';

test('should be able to toggle theme', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await handleToasts(page);
  await page.locator('[aria-label="Toggle theme"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.waitForTimeout(1000);

  await page.locator('[aria-label="Toggle theme"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
