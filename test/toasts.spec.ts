import { test } from '@playwright/test';

import { handleToasts } from './utils';

test('should have toasters', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await handleToasts(page);
});
