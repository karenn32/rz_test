import { APIRequestContext } from '@playwright/test'; 

export class ApiService {
  private token: string;
  private requestContext: APIRequestContext;

  constructor(token: string, requestContext: APIRequestContext) {
    this.token = token;
    this.requestContext = requestContext; 
  }

  async validateRequestInDatabase(name: string, phone: string): Promise<boolean> {
    const response = await this.requestContext.get("https://dev.rentzila.com.ua/api/backcall/", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok()) {
      throw new Error("Failed to fetch data from the API");
    }

    const responseBody = await response.json();

    const expectedEntry = responseBody.find(
      (entry: { name: string; phone: string }) => entry.name === name && entry.phone === phone
    );

    return expectedEntry !== undefined;
  }
}
