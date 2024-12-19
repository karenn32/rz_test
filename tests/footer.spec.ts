import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";
import { ProductsPage } from "../pages/products.page";
import { FooterPages } from "../pages/footer.page";
import { TendersPage } from "../pages/tenders.page";

test.describe("Footer Interaction Test", () => {
  test("C214 - Check footer elements and interact with links", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    const productPage = new ProductsPage(page);
    const footerPages = new FooterPages(page);
    const tendersPage = new TendersPage(page);
    await mainPage.goTo();
    const initialUrl = page.url();
    expect(await mainPage.isAboutLabelDisplayed()).toBeTruthy();
    expect(await mainPage.isPrivacyPolicyLinkDisplayed()).toBeTruthy();
    expect(await mainPage.isCookiePolicyLinkDisplayed()).toBeTruthy();
    expect(await mainPage.isTermsOfUseLinkDisplayed()).toBeTruthy();
    expect(await mainPage.isUsersLabelDisplayed()).toBeTruthy();
    expect(await mainPage.isAnnouncementsLinkDisplayed()).toBeTruthy();
    expect(await mainPage.isTendersLinkDisplayed()).toBeTruthy();
    expect(await mainPage.isContactLabelAndEmailDisplayed()).toBeTruthy();
    expect(await mainPage.isRentzilaLogoFooterDisplayed()).toBeTruthy();
    expect(await mainPage.isRightsReservedLabelDisplayed()).toBeTruthy();

    // Use Promise.all to handle the click and wait for the page to load as the website is very slow
    await Promise.all([
      mainPage.clickPrivacyPolicyLink(),
      page.waitForURL("https://dev.rentzila.com.ua/privacy-policy/", {
        timeout: 60000,
      }),
    ]);
    expect(await footerPages.isPrivacyVisible()).toBeTruthy();

    await Promise.all([
      mainPage.clickCookiePolicyLink(),
      page.waitForURL("https://dev.rentzila.com.ua/cookie-policy/", {
        timeout: 60000,
      }),
    ]);
    expect(await footerPages.isCookiesVisible()).toBeTruthy();

    await Promise.all([
      mainPage.clickTermsOfUseLink(),
      page.waitForURL("https://dev.rentzila.com.ua/terms-conditions/", {
        timeout: 60000,
      }),
    ]);
    expect(await footerPages.isTermsVisible()).toBeTruthy();

    await Promise.all([
      mainPage.clickAnnouncementsLink(),
      page.waitForURL("https://dev.rentzila.com.ua/products/", {
        timeout: 60000,
      }),
    ]);
    expect(await productPage.isOpen()).toBeTruthy();
    
    await mainPage.clickLogoHeader();
    await mainPage.clickTendersLink();
    expect(await tendersPage.isOpen()).toBeTruthy();
    await mainPage.clickLogoHeader();
    await mainPage.clickContactEmail();
  });
});
