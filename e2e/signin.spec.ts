import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/users/profile", async (route) => {
    await route.fulfill({ status: 401, json: { message: "Unauthorized" } });
  });
});

test("presents an accessible sign-in workflow", async ({ page }) => {
  await page.goto("./#/Kanbas/Account/Signin");

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await expect(page.getByLabel("Username")).toBeVisible();
  await expect(page.getByLabel("Password")).toHaveAttribute(
    "autocomplete",
    "current-password"
  );
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
});

test("shows a clear service-unavailable state", async ({ page }) => {
  await page.route("**/api/users/signin", async (route) => route.abort("failed"));
  await page.goto("./#/Kanbas/Account/Signin");

  await page.getByLabel("Username").fill("student");
  await page.getByLabel("Password").fill("not-a-real-password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByRole("alert")).toContainText(
    "temporarily unavailable"
  );
});
