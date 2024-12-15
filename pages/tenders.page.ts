import { Page, Locator } from "@playwright/test";

export class TendersPage {
  readonly page: Page;
  readonly relevantUnits: Locator;
  readonly zeroUnitsTextLocator: Locator;
  readonly url: string;

  constructor(page: Page) {
    this.page = page;
    this.relevantUnits = page.locator('[data-testid="tenderLink"]');
    this.zeroUnitsTextLocator = page.locator("div.MapPagination_count__c_dzg");
    this.url = "/tenders-map/";
  }

  async goTo() {
    await this.page.goto(this.url);
  }

  async isOpen(): Promise<boolean> {
    return this.page.url().includes(this.url);
  }

  async clickFirstRelevantUnit() {
    // Check if there are units present on the page
    const isZeroUnitsTextFound =
      (await this.zeroUnitsTextLocator
        .locator("text=Знайдено 0 тендерів на видимій території")
        .count()) > 0;
    if (!isZeroUnitsTextFound) {
      await this.relevantUnits.first().click();
    }
  }
}
