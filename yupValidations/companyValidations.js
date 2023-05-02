import * as Yup from "yup";

export const addCompanyYup = Yup.object().shape({
  company: Yup.object().shape({
    active: Yup.boolean().required("Company active status is required."),
    address: Yup.string()
      .required("Company address is required.")
      .max(255, "Company address cannot be longer than 255 characters."),
    adminEmail: Yup.string()
      .email("Invalid email format.")
      .required("Admin email is required.")
      .max(255, "Admin email cannot be longer than 255 characters."),
    adminGender: Yup.number()
      .integer("Admin gender must be an integer.")
      .required("Admin gender is required.")
      .min(0, "Admin gender cannot be negative."),
    adminName: Yup.string().required("Admin name is required."),
    adminNationalityId: Yup.number()
      .integer("Admin nationality ID must be an integer.")
      .required("Admin nationality ID is required.")
      .min(0, "Admin nationality ID cannot be negative."),
    adminSecondName: Yup.string(),
    adminSurname: Yup.string().required("Admin surname is required."),
    areaCode: Yup.string()
      .required("Area code is required.")
      .matches(/^\d{3}$/, "Area code must be a 3-digit number."),
    cityId: Yup.number()
      .integer("City ID must be an integer.")
      .required("City ID is required.")
      .min(0, "City ID cannot be negative."),
    companyShortName: Yup.string()
      .required("Company short name is required.")
      .max(50, "Company short name cannot be longer than 50 characters."),
    countryId: Yup.number()
      .integer("Country ID must be an integer.")
      .required("Country ID is required.")
      .min(0, "Country ID cannot be negative."),
    email: Yup.string()
      .email("Invalid email format.")
      .required("Company email is required.")
      .max(255, "Company email cannot be longer than 255 characters."),
    identificationNumber: Yup.string().required(
      "Identification number is required."
    ),
    name: Yup.string()
      .required("Company name is required.")
      .max(255, "Company name cannot be longer than 255 characters."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long.")
      .max(255, "Password cannot be longer than 255 characters."),
    taxName: Yup.string()
      .required("Tax name is required.")
      .max(255, "Tax name cannot be longer than 255 characters."),
    taxNo: Yup.string()
      .required("Tax number is required.")
      .max(20, "Tax number cannot be longer than 20 characters."),
    tel: Yup.string()
      .required("Telephone number is required.")
      .matches(/^\d{10}$/, "Telephone number must be a 10-digit number."),
    tel2: Yup.string().matches(
      /^\d{10}$/,
      "Telephone number must be a 10-digit number."
    ),
    webSite: Yup.string().url("Invalid URL format."),
    zipCode: Yup.string()
      .required("ZIP code is required.")
      .matches(/^\d{5}$/, "ZIP code must be a 5-digit number."),
  }),
  companyPayment: Yup.object().shape({
    licenseType: Yup.string()
      .required("License type is required.")
      .min(0, "License type cannot be negative."),
    userLimit: Yup.number()
      .integer("User limit must be an integer.")
      .required("User limit is required.")
      .min(0, "User limit cannot be negative."),
    totalPrice: Yup.number()
      .required("Total price is required.")
      .min(0, "Total price cannot be negative."),
    invoice: Yup.string().required("Invoice number is required."),
    paymentState: Yup.number()
      .integer("Payment state must be an integer.")
      .required("Payment state is required.")
      .min(0, "Payment state cannot be negative."),
    paymentType: Yup.number()
      .integer("Payment type must be an integer.")
      .required("Payment type is required.")
      .min(0, "Payment type cannot be negative."),
    currencyType: Yup.number()
      .integer("Currency type must be an integer.")
      .required("Currency type is required.")
      .min(0, "Currency type cannot be negative."),
  }),
  companySetting: Yup.array().of(
    Yup.object().shape({
      settingKey: Yup.string().required("Setting key is required."),
      settingValue: Yup.string().required("Setting value is required."),
    })
  ),
});
