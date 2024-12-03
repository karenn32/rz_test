import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";
import { validUser } from "../utils/testUsers";
import { ProfilePage } from "../pages/profile.page";

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
    await mainPage.fillLoginForm("506743060", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("050674306", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("+380-50-674-3060", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("+380 50 674 3060", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("+380(50)6743060", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("(50)6743060", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("05067430600", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("+10506743060", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("+0506743060", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
  });
  test("C576 - Authorization with invalid email", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    await mainPage.openLoginForm();
    await mainPage.fillLoginForm("еуіегіуккутеяшдф", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("testuserrentzilagmail.com", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("testuserrentzila@gmailcom", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("testuserrentzila@gmail", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("testuserrentzila@.com", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("testuserrentzila", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
    await mainPage.fillLoginForm("testuserrentzila@@gmail.com", validUser.password);
    await mainPage.clickLoginButton();
    expect(await mainPage.isFormatPhoneEmailErrorVisible()).toBeTruthy();
  });
  test("C576 - Authorization with invalid password", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    await mainPage.openLoginForm();
    await mainPage.fillLoginForm(validUser.email, 'Testuser10 ');
    await mainPage.clickLoginButton();
    expect(await mainPage.isInvalidPasswordErrorDisplayed()).toBeTruthy();
    await mainPage.fillLoginForm(validUser.email, ' Testuser10');
    await mainPage.clickLoginButton();
    expect(await mainPage.isInvalidPasswordErrorDisplayed()).toBeTruthy();
    await mainPage.fillLoginForm(validUser.email, 'testuser10 ');
    await mainPage.clickLoginButton();
    expect(await mainPage.isInvalidPasswordErrorDisplayed()).toBeTruthy();
    await mainPage.fillLoginForm(validUser.email, 'TESTUSER10 ');
    await mainPage.clickLoginButton();
    expect(await mainPage.isInvalidPasswordErrorDisplayed()).toBeTruthy();
    await mainPage.fillLoginForm(validUser.email, 'Еуіегіук10 ');
    await mainPage.clickLoginButton();
    expect(await mainPage.isInvalidPasswordErrorDisplayed()).toBeTruthy();
    await mainPage.fillLoginForm(validUser.email, 'Testuser13');
    await mainPage.clickLoginButton();
    expect(await mainPage.isInvalidCredentialsErrorVisible()).toBeTruthy();
  });
});
