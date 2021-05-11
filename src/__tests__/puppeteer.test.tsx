import puppeteer from "puppeteer";

describe("Google", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/");
  });

  it('should be titled "Game Store"', async () => {
    await expect(page.title()).resolves.toMatch("Game Store");
  });
  it('should be click "Login"', async () => {
    page.click("Login");
  });
});
