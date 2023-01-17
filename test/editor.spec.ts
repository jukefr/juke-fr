import { test, expect } from '@playwright/test';

import { handleToasts } from './utils';

test('should be able to toggle editor', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await handleToasts(page);
  await page.locator('[aria-label="Toggle Editor"]').click();
  await expect(page.locator('.jinx-editor')).toBeVisible();
  await page.locator('[aria-label="Toggle Editor"]').click();
  await expect(page.locator('.jinx-editor')).toBeHidden();
});
