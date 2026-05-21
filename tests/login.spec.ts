import {test, expect} from './fixture';

test.use({storageState:{cookies:[], origins:[]}}); // Clear cookies and local storage before each test
test.describe('Login Feature', ()=>{

    test('Login with invalid credentials', async ({page, baseURL})=>{
        await page.goto(baseURL!);

        // login
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.getByRole('textbox', { name: 'Email:' }).fill(process.env.ADMIN_USERNAME!);
        await page.getByRole('textbox', { name: 'Password:' }).fill('wrongpass');
        await page.getByRole('checkbox', { name: 'Remember me?' }).check();
        await page.getByRole('button', { name: 'Log in' }).click();

        // Verify that the error message is displayed
        await expect(page.getByText('The credentials provided are incorrect')).toBeVisible();

    })

})



