import { test } from '@playwright/test';

test('clear session', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Log out' }).click();
    await page.context().clearCookies();
    await page.context().clearPermissions();
    await page.context().storageState({ path: './auth.json' });
});