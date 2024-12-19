import * as dotenv from "dotenv";

dotenv.config();
export const validUser = {
  phone: process.env.VALID_USER_PHONE || "",
  phoneWithoutPlus: process.env.VALID_USER_PHONE_WITHOUT_PLUS || "",
  phoneWithoutCode: process.env.VALID_USER_PHONE_WITHOUT_CODE || "",
  email: process.env.VALID_USER_EMAIL || "",
  password: process.env.VALID_USER_PASSWORD || "",
};
