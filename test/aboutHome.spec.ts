import { test, expect } from '@playwright/test';

import { handleToasts } from './utils';

test('should be able able to navigate to about and back', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await handleToasts(page);
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/about' }*/),
    page.locator('text=about').click(),
  ]);
  await expect(page).toHaveURL('/about');
  await expect(page.locator('h2').first()).toContainText(
    'hypertext references',
  );
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/' }*/),
    page.locator('h1', { hasText: 'juke' }).click(),
  ]);
  await expect(page).toHaveURL('/');
  await expect(page.locator('h2').first()).toContainText('random projects');
});
