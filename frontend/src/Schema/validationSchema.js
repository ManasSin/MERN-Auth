import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  address: Yup.string()
    .max(1000, "Address must be at most 1000 characters")
    .required("Address is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  website: Yup.string().url("Invalid URL").required("Website is required"),
  // contactPersonName: Yup.string()
  //     .max(100, "Contact person name must be at most 100 characters")
  //     .required("Contact person name is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Invalid phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});

export { validationSchema, LoginSchema };
