import { test, expect } from '@playwright/test';

test('should be able to toggle editor', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('[aria-label="Toggle Editor"]').click();
  await expect(page.locator('.jinx-editor')).toBeVisible();
  await page.locator('[aria-label="Toggle Editor"]').click();
  await expect(page.locator('.jinx-editor')).toBeHidden();
});
