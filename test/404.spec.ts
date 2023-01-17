import { test, expect } from '@playwright/test';

import { handleToasts } from './utils';

test('should have a 404 page', async ({ page }) => {
  await page.goto('/404', { waitUntil: 'networkidle' });
  await handleToasts(page);
  await expect(page.locator('h2').first()).toContainText('404');
});
