import { expect, test, type Page } from "@playwright/test";

/** No element should push the page wider than the viewport (spec: no horizontal
 * overflow from 360px through desktop). */
async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe("landing page", () => {
  test("renders the hero and auth card without horizontal overflow", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /create your account/i })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("first Tab reaches the skip link", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
  });
});
