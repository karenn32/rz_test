import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";
import { ProductsPage } from "../pages/products.page";

test.describe("Main Page Tests", () => {
  let mainPage: MainPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    productsPage = new ProductsPage(page);

    await mainPage.goTo();
    expect(await mainPage.isPopularTabDisplayed()).toBeTruthy();
  });

  test('C212 - Checking ""Послуги"" section on the main page', async () => {
    expect(await mainPage.areServiceItemsDisplayed(7)).toBeTruthy();
    await mainPage.clickPopularServiceTab();
    expect(await mainPage.isPopularTabDisplayed()).toBeTruthy();
    await mainPage.clickEveryItemUnderEveryTab(
      mainPage.serviceTabs,
      mainPage.serviceItems,
      async () => {
        await productsPage.clickFirstRelevantUnit();
      }
    );
  });

  test('C213 - Checking ""Спецтехніка"" section on the main page', async () => {
    await mainPage.clickPopularEquipmentTab();
    expect(await mainPage.isPopularTabDisplayed()).toBeTruthy();
    await mainPage.clickEveryItemUnderEveryTab(
      mainPage.specialEquipmentTabs,
      mainPage.specialEquipmentItems,
      async () => {
        await productsPage.clickFirstRelevantUnit();
      }
    );
  });
});
