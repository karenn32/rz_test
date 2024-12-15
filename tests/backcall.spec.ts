import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page.ts";
import { generateRandomString } from "../utils/random.ts";
import testData from "../testData.json";
import { config } from "dotenv";

config();
const randomName = generateRandomString(10);
const token = process.env.API_TOKEN;
test.describe("Consultation Form Test", () => {
  test("C226 - Verify У Вас залишилися питання? form", async ({
    page,
    request,
  }) => {
    const mainPage = new MainPage(page, request, token);
    await mainPage.goTo();
    await mainPage.scrollToConsultationForm();
    await mainPage.clickSubmitButton();
    expect(await mainPage.isEmptyNameErrorDisplayed()).toBeTruthy();
    expect(await mainPage.isEmptyPhoneErrorDisplayed()).toBeTruthy();
    await mainPage.inputName(randomName);
    await mainPage.clickSubmitButton();
    expect(await mainPage.isEmptyNameErrorDisplayed()).toBeFalsy();
    expect(await mainPage.isEmptyPhoneErrorDisplayed()).toBeTruthy();
    await mainPage.phoneInput.click();
    await mainPage.inputPhoneNumber(testData.validPhoneNumber);
    await mainPage.clearNameField();
    await mainPage.clickSubmitButton();
    expect(await mainPage.isEmptyNameErrorDisplayed()).toBeTruthy();
    expect(await mainPage.isEmptyPhoneErrorDisplayed()).toBeFalsy();
    await mainPage.inputName(randomName);

    // Test invalid phone numbers and click the button each time
    for (const number of testData.invalidPhoneNumbers) {
      await mainPage.inputPhoneNumber(number);
      await mainPage.clickSubmitButton();
      expect(await mainPage.isValidationPhoneErrorDisplayed()).toBeTruthy();
    }

    await mainPage.inputPhoneNumber(testData.validPhoneNumber);
    await mainPage.clickAndAcceptDialog();

    // Check that data is present through API
    const isSavedInDatabase = await mainPage.validateRequestInDatabase(
      randomName,
      testData.validPhoneNumber
    );
    expect(isSavedInDatabase).toBeTruthy();
  });
});
