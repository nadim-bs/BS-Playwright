import{test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';

test.describe('Registration Feature', async()=>{
    test.beforeEach(async ({page, baseURL})=>{
        await page.goto(baseURL!);
    })

    test('Should load page successfully', async ({page, baseURL})=>{
        // generate random user data using faker
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({firstName, lastName, provider: 'yopmail.com'}).toLowerCase();
        const pass = "Pass@1234";

        // Click on the register link
        const registerLink = page.getByRole('link', { name: 'Register' });
        await registerLink.click();

        //  Verify that the registration page is loaded and fill the registration form
        const registerHeading = page.getByRole('heading', { name: 'Register ' });
        const gender =  page.getByRole('radio', { name: 'Male', exact: true });
        const first_Name =  page.getByRole('textbox', { name: 'First name:' });
        const last_Name =  page.getByRole('textbox', { name: 'Last name:' });
        const email_address =  page.getByRole('textbox', { name: 'Email:' });
        const password =  page.getByRole('textbox', { name: 'Password:', exact: true });
        const confirmPassword =  page.getByRole('textbox', { name: 'Confirm password:' });

        await expect(registerHeading).toBeVisible();
        await gender.check();
        await first_Name.fill(firstName);
        await last_Name.fill(lastName);
        await email_address.fill(email);
        await password.fill(pass);
        await confirmPassword.fill(pass);

        // Click on the register button 
        const registerButton = page.getByRole('button', { name: 'Register' });
        await expect(registerButton).toBeVisible();
        await registerButton.click();

        // Verify that the registration was successful
        await expect(page.getByRole('link', { name: email})).toBeVisible();
        await expect(page.getByText('Your registration completed')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

    })

})   

