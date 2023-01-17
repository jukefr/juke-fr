import type { Page } from '@playwright/test';

// (strict mode mounts and unmounts everything once so we have x2)
export const handleToasts = async (page: Page) => {
  await page.locator('[aria-label="Close"]').first().click();
  await page.locator('[aria-label="Close"]').first().click();
};
