import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";
import { ProductsPage } from "../pages/products.page";

test.describe("Main Page Test", () => {
  test('C212 - Checking ""Послуги"" section on the main page', async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    const productsPage = new ProductsPage(page);

    await mainPage.goTo();
    expect(await mainPage.isPopularTabDisplayed()).toBeTruthy();
    expect(await mainPage.areServiceItemsDisplayed(7)).toBeTruthy();
    await mainPage.clickPopularServiceTab();

    const totalServiceTabs = await mainPage.serviceTabs.count();
    //Checks every service under every tab
    for (let i = 0; i < totalServiceTabs; i++) {
      await mainPage.clickServiceTabByIndex(i);
      const totalServices = await mainPage.serviceItems.count();
      for (let j = 0; j < totalServices; j++) {
        await mainPage.clickServiceByIndex(j);
        await productsPage.clickFirstRelevantUnit();
        await mainPage.clickLogoHeader();
      }
    }
  });

  test('C213 - Checking ""Спецтехніка"" section on the main page', async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    const productsPage = new ProductsPage(page);

    await mainPage.goTo();
    expect(await mainPage.isPopularTabDisplayed()).toBeTruthy();

    await mainPage.clickPopularEquipmentTab();
    const totalSpecialEquipmentTabs =
      await mainPage.specialEquipmentTabs.count();
    //Checks every equipment under every tab
    for (let i = 0; i < totalSpecialEquipmentTabs; i++) {
      await mainPage.clickServiceTabByIndex(i);
      const totalSpecialEquipmet = await mainPage.specialEquipmentItems.count();
      for (let j = 0; j < totalSpecialEquipmet; j++) {
        await mainPage.clickServiceByIndex(j);
        await productsPage.clickFirstRelevantUnit();
        await mainPage.clickLogoHeader();
      }
    }
  });
});
