import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";

test.describe("Footer Interaction Test", () => {
  test("C214 - Check footer elements and interact with links", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
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
    await mainPage.clickPrivacyPolicyLink();
    await mainPage.clickCookiePolicyLink();
    await mainPage.clickTermsOfUseLink();
    await mainPage.clickAnnouncementsLink();
    await mainPage.clickLogoHeader();
    await mainPage.clickTendersLink();
    await mainPage.clickLogoHeader();
    await mainPage.clickContactEmail();
  });
});
