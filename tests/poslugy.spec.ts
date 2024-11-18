import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";
import { ProductsPage } from "../pages/products.page";

test('C212 - Checking ""Послуги"" section on the main page', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const productsPage = new ProductsPage(page);

  await mainPage.goTo();
  expect(await mainPage.isPopularTabDisplayed()).toBeTruthy();
  expect(await mainPage.areServiceItemsDisplayed(7)).toBeTruthy();
  await mainPage.clickPopularServiceTab();

  
  await mainPage.clickEveryItemUnderEveryTab(
    mainPage.serviceTabs,
    mainPage.serviceItems,
    async () => {
      await productsPage.clickFirstRelevantUnit();
    }
  );
});

test('C213 - Checking ""Спецтехніка"" section on the main page', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const productsPage = new ProductsPage(page);

  await mainPage.goTo();
  expect(await mainPage.isPopularTabDisplayed()).toBeTruthy();
  await mainPage.clickPopularEquipmentTab();

  await mainPage.clickEveryItemUnderEveryTab(
    mainPage.specialEquipmentTabs,
    mainPage.specialEquipmentItems,
    async () => {
      await productsPage.clickFirstRelevantUnit();
    }
  );
});
