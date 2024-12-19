import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";
import { validUser } from "../utils/testUsers";
import { ProfilePage } from "../pages/profile.page";
import testData from "../fixtures/testData.json";

test.describe("Login test", () => {
  test("C200 - Login with empty email and password", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    await mainPage.openLoginForm();
    await mainPage.fillLoginForm(validUser.email, "");
    await mainPage.clickLoginButton();
    expect(await mainPage.isEmpyPasswordErrorOnLoginVisible()).toBeTruthy();
    await mainPage.fillLoginForm("", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isEmptyEmailErrorOnLoginVisible()).toBeTruthy();
  });

  test("C201 - Authorization with valid user", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    await mainPage.openLoginForm();
    await mainPage.fillLoginForm(validUser.email, validUser.password);
    await mainPage.clickHidePasswordButton();
    await expect(mainPage.passwordInput).toHaveAttribute("type", "text"); //check that password is visible
    await mainPage.clickHidePasswordButton();
    await expect(mainPage.passwordInput).toHaveAttribute("type", "password"); //check that password is hidden
    await mainPage.clickLoginButton();
    await mainPage.clickUserIcon();
    await expect(mainPage.profileDropdownEmail).toHaveText(validUser.email);
    await mainPage.clickLogoutButton();
    await mainPage.openLoginForm();
    await mainPage.fillLoginForm(
      validUser.email.toUpperCase(),
      validUser.password
    );
    await mainPage.clickHidePasswordButton();
    await expect(mainPage.passwordInput).toHaveAttribute("type", "text"); //check that password is visible
    await mainPage.clickHidePasswordButton();
    await expect(mainPage.passwordInput).toHaveAttribute("type", "password"); //check that password is hidden
    await mainPage.clickLoginButton();
    await mainPage.clickUserIcon();
    await expect(mainPage.profileDropdownEmail).toHaveText(validUser.email);
  });

  test("C202 - Authorization with valid phone", async ({ page }) => {
    const mainPage = new MainPage(page);
    const profilePage = new ProfilePage(page);
    await mainPage.goTo();
    await mainPage.openLoginForm();
    await mainPage.fillLoginForm(validUser.phone, validUser.password);
    expect(mainPage.isAnyPasswordErrorVisible).toBeFalsy();
    await mainPage.clickLoginButton();
    await mainPage.clickUserIcon();
    await mainPage.clickProfileButton();
    expect(
      await profilePage.isProfilePhoneCorrect(validUser.phone)
    ).toBeTruthy();
    await mainPage.clickUserIcon();
    await mainPage.clickLogoutButton();
    await mainPage.openLoginForm();
    await mainPage.fillLoginForm(
      validUser.phoneWithoutPlus,
      validUser.password
    );
    await mainPage.clickLoginButton();
    await mainPage.clickUserIcon();
    await mainPage.clickProfileButton();
    expect(
      await profilePage.isProfilePhoneCorrect(validUser.phone)
    ).toBeTruthy();
    await mainPage.clickUserIcon();
    await mainPage.clickLogoutButton();
    await mainPage.openLoginForm();
    await mainPage.fillLoginForm(
      validUser.phoneWithoutCode,
      validUser.password
    );
    await mainPage.clickLoginButton();
    await mainPage.clickUserIcon();
    await mainPage.clickProfileButton();
    expect(
      await profilePage.isProfilePhoneCorrect(validUser.phone)
    ).toBeTruthy();
  });

  test("C207 - Authorization with invalid phone", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    await mainPage.openLoginForm();
    for (const phoneNumber of testData.invalidPhonesForLogin) {
      await mainPage.fillLoginForm(phoneNumber, validUser.password);
      await mainPage.clickLoginButton();
      expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    }
  });

  test("C576 - Authorization with invalid email", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    await mainPage.openLoginForm();
    for (const email of testData.invalidEmailsForLogin) {
      await mainPage.fillLoginForm(email, validUser.password);
      await mainPage.clickLoginButton();
      expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    }
  });

  test("C577 - Authorization with invalid password", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    await mainPage.openLoginForm();
    for (const { password, errorType } of testData.invalidPasswordsForLogin) {
      await mainPage.fillLoginForm(validUser.email, password);
      await mainPage.clickLoginButton();
      expect(await mainPage[errorType]()).toBeTruthy();
    }
  });
});
