import { expect, test, type Page } from "@playwright/test";

async function overflow(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
}

test.describe("app shell (mock preview)", () => {
  test("shows the preview banner and loads conversations", async ({ page }) => {
    await page.goto("/app");
    await expect(page.getByText(/mock preview/i)).toBeVisible();
    // The loading skeleton resolves into the mock conversations.
    await expect(page.getByRole("button", { name: /Ada Lovelace/i })).toBeVisible();
    expect(await overflow(page)).toBeLessThanOrEqual(1);
  });

  test("opens the create-room modal and reveals a copyable code", async ({ page }) => {
    await page.goto("/app");
    await page
      .getByRole("button", { name: /create room/i })
      .first()
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /^create room$/i }).click();
    await expect(dialog.getByText(/your invite code/i)).toBeVisible();
    await expect(dialog.getByRole("button", { name: /copy code/i })).toBeVisible();
  });

  test("mobile: selecting a conversation opens the chat and back returns", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "mobile-only navigation");
    await page.goto("/app");
    await page.getByRole("button", { name: /Ada Lovelace/i }).click();
    // Composer is visible in the chat view.
    await expect(page.getByLabel("Message", { exact: true })).toBeVisible();
    expect(await overflow(page)).toBeLessThanOrEqual(1);
    await page.getByRole("button", { name: /back to conversations/i }).click();
    await expect(page.getByRole("button", { name: /Ada Lovelace/i })).toBeVisible();
  });
});
