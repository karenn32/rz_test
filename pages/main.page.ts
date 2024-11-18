import { Page, Locator } from "@playwright/test";
import { ApiService } from "../services/api.service";
import { APIRequestContext } from '@playwright/test';


export class MainPage {
  readonly page: Page;
  readonly servicesSection: Locator;
  readonly popularServiceTab: Locator;
  readonly popularEquipmentTab: Locator;
  readonly serviceItems: Locator;
  readonly relevantUnits: Locator;
  readonly logoHeader: Locator;
  readonly agriculturalTab: Locator;
  readonly constructionTab: Locator;
  readonly otherTab: Locator;
  readonly serviceTabs: Locator;
  readonly specialEquipmentTabs: Locator;
  readonly specialEquipmentItems: Locator;
  readonly footer: Locator;
  readonly aboutLabel: Locator;
  readonly privacyPolicyLink: Locator;
  readonly cookiePolicyLink: Locator;
  readonly termsOfUseLink: Locator;
  readonly usersLabel: Locator;
  readonly announcementsLink: Locator;
  readonly tendersLink: Locator;
  readonly contactLabel: Locator;
  readonly contactEmail: Locator;
  readonly logoFooter: Locator;
  readonly copyrightLabel: Locator;
  readonly consultationForm: Locator;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;
  readonly modalOkButton: Locator;
  readonly emptyNameInputError: Locator;
  readonly nameForm: Locator;
  readonly phoneForm: Locator;
  readonly emptyPhoneInputError: Locator;
  readonly validationPhoneImputError: Locator;
  private apiService: ApiService;

  constructor(page: Page, requestContext?: APIRequestContext, token?: string) {
    if (requestContext && token) {
      this.apiService = new ApiService(token, requestContext);
    }
    this.page = page;
    this.servicesSection = page.locator('[data-testid="services"]');
    this.serviceItems = page.locator('div[data-testid^="service__"]');
    this.logoHeader = page.locator("a.Navbar_logo__RsJHS");
    this.popularServiceTab = page.locator(
      '[data-testid="services__populyarni"]'
    );
    this.popularEquipmentTab = page.locator(
      '[data-testid="specialEquipment__populyarna"]'
    );
    this.agriculturalTab = page.locator(
      '[data-testid="services__silskogospodarski"]'
    );
    this.constructionTab = page.locator('[data-testid="services__budivelni"]');
    this.otherTab = page.locator('[data-testid="services__inshi"]');
    this.serviceTabs = page.locator('div[data-testid^="services__"]');
    this.specialEquipmentTabs = page.locator(
      'div[data-testid^="specialEquipment__"]'
    );
    this.specialEquipmentItems = page.locator('div[data-testid^="category__"]');
    this.aboutLabel = page.locator('[data-testid="content"]');
    this.privacyPolicyLink = page.locator(
      '[data-testid="politika-konfidenciinosti"]'
    );
    this.cookiePolicyLink = page.locator(
      '[data-testid="pravila-vikoristannya-failiv-cookie"]'
    );
    this.termsOfUseLink = page.locator(
      '[data-testid="umovi-dostupu-ta-koristuvannya"]'
    );
    this.usersLabel = page.locator("text=Користувачам");
    this.announcementsLink = page.locator('a[href="/products/"]:not(header *)');
    this.tendersLink = page.locator('a[href="/tenders-map/"]:not(header *)');
    this.contactLabel = page.locator("text=Контакти");
    this.contactEmail = page.locator('a[href="mailto:info@rentzila.com.ua"]');
    this.logoFooter = page.locator('[data-testid="logo"]:not(header *)');
    this.copyrightLabel = page.locator('[data-testid="copyright"]');

    this.consultationForm = page.locator('.Layouts_consultation__JUU1R');
    this.nameInput = page.locator('input[name="name"]');
    this.nameForm = page.locator('.ConsultationForm_name__3bVcz')
    this.emptyNameInputError = this.nameForm.locator('text=Поле не може бути порожнім');
    this.phoneForm = page.locator('.ConsultationForm_phone__vEOS9')
    this.phoneInput = page.locator('#mobile');
    this.emptyPhoneInputError = this.phoneForm.locator('text=Поле не може бути порожнім')
    this.validationPhoneImputError = this.phoneForm.locator('text=Телефон не пройшов валідацію')
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goTo() {
    await this.page.goto("https://dev.rentzila.com.ua/");
  }

  // Method to check if backcall present
  async validateRequestInDatabase(name: string, phone: string): Promise<boolean> {
    return this.apiService.validateRequestInDatabase(name, phone);
  }
  
  async isPopularTabDisplayed() {
    return await this.popularServiceTab.isVisible();
  }

  async clickPopularServiceTab() {
    await this.popularServiceTab.click();
  }

  async clickPopularEquipmentTab() {
    await this.popularEquipmentTab.click();
  }

  async clickAgriculturalTab() {
    await this.agriculturalTab.click();
  }

  async clickConstructionTab() {
    await this.constructionTab.click();
  }

  async clickOtherTab() {
    await this.otherTab.click();
  }

  async areServiceItemsDisplayed(count: number) {
    return (await this.serviceItems.count()) >= count;
  }

  async clickServiceByIndex(index: number) {
    await this.serviceItems.nth(index).click();
  }

  async clickServiceTabByIndex(index: number) {
    await this.serviceTabs.nth(index).click();
  }

  async clickSpecialEquipmentByIndex(index: number) {
    await this.specialEquipmentItems.nth(index).click();
  }

  async clickSpecialEquipmentTabByIndex(index: number) {
    await this.specialEquipmentTabs.nth(index).click();
  }

  async clickFirstRelevantUnit() {
    await this.relevantUnits.first().click();
  }

  async clickLogoHeader() {
    await this.logoHeader.click();
  }

  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async isAboutLabelDisplayed() {
    return await this.aboutLabel.isVisible();
  }

  async isPrivacyPolicyLinkDisplayed() {
    return await this.privacyPolicyLink.isVisible();
  }

  async isCookiePolicyLinkDisplayed() {
    return await this.cookiePolicyLink.isVisible();
  }

  async isTermsOfUseLinkDisplayed() {
    return await this.termsOfUseLink.isVisible();
  }

  async isUsersLabelDisplayed() {
    return await this.usersLabel.isVisible();
  }

  async isAnnouncementsLinkDisplayed() {
    return await this.announcementsLink.isVisible();
  }

  async isTendersLinkDisplayed() {
    return await this.tendersLink.isVisible();
  }

  async isContactLabelAndEmailDisplayed() {
    return (
      (await this.contactLabel.isVisible()) &&
      (await this.contactEmail.isVisible())
    );
  }

  async isRentzilaLogoFooterDisplayed() {
    return await this.logoFooter.isVisible();
  }

  async isRightsReservedLabelDisplayed() {
    return await this.copyrightLabel.isVisible();
  }

  async clickPrivacyPolicyLink() {
    await this.privacyPolicyLink.click();
  }

  async clickCookiePolicyLink() {
    await this.cookiePolicyLink.click();
  }

  async clickTermsOfUseLink() {
    await this.termsOfUseLink.click();
  }

  async clickAnnouncementsLink() {
    await this.announcementsLink.click();
  }

  async clickTendersLink() {
    await this.tendersLink.click();
  }

  async clickContactEmail() {
    await this.contactEmail.click();
  }

  async scrollToConsultationForm() {
    await this.consultationForm.scrollIntoViewIfNeeded();
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async inputName(name: string) {
    await this.nameInput.fill(name);
  }

  async inputPhoneNumber(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async isEmptyNameErrorDisplayed(){
    return await this.emptyNameInputError.isVisible();
  }

  async isEmptyPhoneErrorDisplayed(){
    return await this.emptyPhoneInputError.isVisible();
  }

  async isValidationPhoneErrorDisplayed(){
    return await this.validationPhoneImputError.isVisible();
  }

  async clearNameField() {
    await this.nameInput.clear();
  }

  async clickAndAcceptDialog() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.submitButton.click();
    const dialog = await dialogPromise;
    await dialog.accept();
  }

  async clickEveryItemUnderEveryTab(
    tabLocator: Locator,
    itemLocator: Locator,
    onItemInteraction?: () => Promise<void>
  ) {
    const totalTabs = await tabLocator.count();
  
    for (let i = 0; i < totalTabs; i++) {
      await tabLocator.nth(i).click();
  
      const totalItems = await itemLocator.count();
      for (let j = 0; j < totalItems; j++) {
        await itemLocator.nth(j).click();
        if (onItemInteraction) {
          await onItemInteraction();
        }
  
        await this.clickLogoHeader();
      }
    }
  }

}
