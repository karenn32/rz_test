import { Page, Locator } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly phone: Locator;

  constructor(page: Page) {
    this.phone = page.locator('[data-testid="input_OwnerProfileNumber"]');
  }

  async isProfilePhoneCorrect(phone: string): Promise<boolean> {
    const phoneValue = (await this.phone.inputValue()).replace(/\s+/g, "");
    return phone === phoneValue;
  }
}
