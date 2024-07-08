import { expect, test } from '@playwright/test';

test('login has form visible', async ({ page }) => {
	await page.goto('/login');
	await expect(page.locator('input[type=text]')).toBeVisible();
	await expect(page.locator('input[type=password]')).toBeVisible();
	await expect(page.locator('button')).toBeVisible();
});

test('login form shows correct validation messages', async ({ page }) => {
	await page.goto('/login');
	await page.getByPlaceholder("Email").fill("dashboard@dashboard.com")
	await page.getByPlaceholder("Password").fill("password")
	await page.getByRole("button").click();
})
