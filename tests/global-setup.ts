import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('Login with valid credentials', async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    // Login
    await page.getByRole('link', { name: 'Log in' }).click();

    await page.getByRole('textbox', { name: 'Email:' }).fill(process.env.ADMIN_USERNAME!);
    await page.getByRole('textbox', { name: 'Password:' }).fill(process.env.ADMIN_PASSWORD!);
    await page.getByRole('checkbox', { name: 'Remember me?' }).check();
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByRole('link', { name: process.env.ADMIN_USERNAME })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Register' })).toBeHidden();
    await page.context().storageState({ path: './auth.json' }); // Save the authenticated state to a file for reuse in other tests
});