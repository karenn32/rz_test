import { Page, Locator } from "@playwright/test";

export class FooterPages {
  readonly page: Page;
  readonly privacy: Locator;
  readonly cookie: Locator;
  readonly terms: Locator;

  constructor(page: Page) {
    this.page = page;
    this.privacy = page.getByRole("heading", {
      name: "Політика конфіденційності",
    });
    this.cookie = page.getByRole("heading", {
      name: "Політика використання файлів cookie",
    });
    this.terms = page.getByRole("heading", {
      name: "Угода користувача",
    });
  }

  async isPrivacyVisible() {
    return await this.privacy.isVisible();
  }

  async isCookiesVisible() {
    return await this.cookie.isVisible();
  }

  async isTermsVisible() {
    return await this.terms.isVisible();
  }
}
