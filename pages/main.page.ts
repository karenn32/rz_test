import { Page, Locator } from "@playwright/test";
import { ApiService } from "../services/api.service";
import { APIRequestContext } from "@playwright/test";

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
  readonly formatPhoneEmailError: Locator;
  private apiService: ApiService;
  readonly loginForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly openLoginFormButton: Locator;
  readonly submitLoginButton: Locator;
  readonly emptyEmailError: Locator;
  readonly emptyPasswordError: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly hidePasswordButton: Locator;
  readonly userIcon: Locator;
  readonly profileDropdown: Locator;
  readonly profileDropdownEmail: Locator;
  readonly logoutButton: Locator;
  readonly profileButton: Locator;
  readonly invalidPasswordError: Locator;
  readonly invalidCredentialsError: Locator;

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

    this.consultationForm = page.locator(".Layouts_consultation__JUU1R");
    this.nameInput = page.locator('input[name="name"]');
    this.nameForm = page.locator(".ConsultationForm_name__3bVcz");
    this.emptyNameInputError = this.nameForm.locator(
      "text=Поле не може бути порожнім"
    );
    this.phoneForm = page.locator(".ConsultationForm_phone__vEOS9");
    this.phoneInput = page.locator("#mobile");
    this.emptyPhoneInputError = this.phoneForm.locator(
      "text=Поле не може бути порожнім"
    );
    this.validationPhoneImputError = this.phoneForm.locator(
      "text=Телефон не пройшов валідацію"
    );
    this.submitButton = page.locator('button[type="submit"]');
    this.loginForm = page.locator(".LoginForm_form__7G3Zk");
    this.openLoginFormButton = page.locator(
      ".NavbarAuthBlock_buttonEnter__c9siH",
      { hasText: "Вхід" }
    );
    this.submitLoginButton = this.loginForm.locator('button[type="submit"]');
    this.emailField = this.loginForm
      .locator(".CustomReactHookInput_field__ys1mK")
      .nth(0);
    this.passwordField = this.loginForm
      .locator(".CustomReactHookInput_field__ys1mK")
      .nth(1);
    this.emailInput = this.emailField.locator("#email");
    this.passwordInput = this.passwordField.locator("#password");
    this.emptyEmailError = this.emailField.locator(
      "text=Поле не може бути порожнім"
    );
    this.formatPhoneEmailError = this.emailField.locator(
      "text=Неправильний формат email або номера телефону"
    );
    this.emptyPasswordError = this.passwordField.locator(
      "text=Поле не може бути порожнім"
    );
    this.invalidPasswordError = this.passwordField.locator(
      "text=Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли"
    );
    this.invalidCredentialsError = this.loginForm.locator(
      "text=Невірний e-mail або пароль"
    );
    this.hidePasswordButton = this.passwordField.locator(
      '[data-testid="reactHookButton"]'
    );
    this.userIcon = page.locator('[data-testid="avatarBlock"]');
    this.profileDropdown = page.locator('[data-testid="profileDropdown"]');
    this.profileDropdownEmail = this.profileDropdown.locator(
      '[data-testid="email"]'
    );
    this.logoutButton = this.profileDropdown.locator('[data-testid="logout"]');
    this.profileButton = this.profileDropdown.locator(
      '[data-testid="profile"]'
    );
  }

  async goTo() {
    await this.page.goto("https://dev.rentzila.com.ua/");
  }

  // Method to check if backcall present
  async validateRequestInDatabase(
    name: string,
    phone: string
  ): Promise<boolean> {
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
    return this.aboutLabel.isVisible();
  }

  async isPrivacyPolicyLinkDisplayed() {
    return this.privacyPolicyLink.isVisible();
  }

  async isCookiePolicyLinkDisplayed() {
    return this.cookiePolicyLink.isVisible();
  }

  async isTermsOfUseLinkDisplayed() {
    return this.termsOfUseLink.isVisible();
  }

  async isUsersLabelDisplayed() {
    return this.usersLabel.isVisible();
  }

  async isAnnouncementsLinkDisplayed() {
    return this.announcementsLink.isVisible();
  }

  async isTendersLinkDisplayed() {
    return this.tendersLink.isVisible();
  }

  async isContactLabelAndEmailDisplayed() {
    return (
      (await this.contactLabel.isVisible()) &&
      (await this.contactEmail.isVisible())
    );
  }

  async isRentzilaLogoFooterDisplayed() {
    return this.logoFooter.isVisible();
  }

  async isRightsReservedLabelDisplayed() {
    return this.copyrightLabel.isVisible();
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

  async isEmptyNameErrorDisplayed() {
    return this.emptyNameInputError.isVisible();
  }

  async isEmptyPhoneErrorDisplayed() {
    return this.emptyPhoneInputError.isVisible();
  }

  async isValidationPhoneErrorDisplayed() {
    return this.validationPhoneImputError.isVisible();
  }

  async clearNameField() {
    await this.nameInput.clear();
  }

  async clickAndAcceptDialog() {
    const dialogPromise = this.page.waitForEvent("dialog");
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

  async openLoginForm() {
    await this.openLoginFormButton.click();
  }

  async fillLoginForm(email: string, password: string) {
    await this.emailInput.clear();
    await this.passwordInput.clear();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.submitLoginButton.click();
  }

  async isEmpyPasswordErrorOnLoginVisible() {
    return this.emptyPasswordError.isVisible();
  }

  async isEmptyEmailErrorOnLoginVisible() {
    return this.emptyEmailError.isVisible();
  }

  async clickHidePasswordButton() {
    await this.hidePasswordButton.click();
  }

  async clickUserIcon() {
    await this.userIcon.click();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async clickProfileButton() {
    await this.profileButton.click();
  }

  async isFormatPhoneEmailErrorVisible() {
    return this.formatPhoneEmailError.isVisible();
  }

  //as the form sometimes doesn't work fast, I've added waitFor
  async isInvalidCredentialsErrorVisible() {
    try {
      await this.invalidCredentialsError.waitFor({
        state: "visible",
        timeout: 15000,
      });
      return true;
    } catch {
      return false;
    }
  }

  async isInvalidPasswordErrorDisplayed() {
    return this.invalidPasswordError.isVisible();
  }
}
