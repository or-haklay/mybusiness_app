import { useFormik } from "formik";
import Input from "../components/common/input";
import Joi from "joi";
import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

function Register() {
  const { register } = useAuth();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { getFieldProps, isValid, handleSubmit, errors, touched } = useFormik({
    validateOnMount: true,
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      isBusiness: "false",
    },
    validate: (values) => {
      const schema = Joi.object({
        firstName: Joi.string().required().min(2).max(256).label("First Name"),
        lastName: Joi.string().required().min(2).max(256).label("Last Name"),
        phone: Joi.string().required().min(9).max(11).label("Phone Number"),
        email: Joi.string()
          .required()
          .min(5)
          .email({ tlds: { allow: false } })
          .email({ tlds: false })
          .label("Email"),
        password: Joi.string().min(7).max(20).label("Password").required(),
        country: Joi.string().min(2).max(256).label("Country").required(),
        city: Joi.string().min(2).max(256).label("City").required(),
        street: Joi.string().min(2).max(256).label("Street").required(),
        houseNumber: Joi.number()
          .min(2)
          .max(256)
          .label("House Number")
          .required(),
        zip: Joi.number().label("Zip Code").required(),
        isBusiness: Joi.boolean().label("Business User"),
      });

      const { error } = schema.validate(values, { abortEarly: false });

      if (!error) {
        return null;
      }

      const errors = {};

      for (let index = 0; index < error.details.length; index++) {
        const element = error.details[index];

        errors[element.path[0]] = element.message;
      }

      return errors;
    },

    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await register(values);
        console.log(response.data);
        navigate("/sign-in");
        toast.success("Registration successful! Please sign in.");
      } catch (err) {
        console.log(err);
        if (err.status === 400) {
          toast.error(err.response.data);
        }
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column p-5 gap-3 container flex-fill mx-auto justify-content-center my-5"
    >
      <div className="d-flex flex-column flex-md-row gap-2">
        <Input
          {...getFieldProps("firstName")}
          name="firstName"
          label="First Name"
          type="text"
          error={touched.firstName && errors.firstName}
          placeholder="Israel"
          width="col-md-4"
          required
        />
        <Input
          {...getFieldProps("lastName")}
          name="lastName"
          label="Last Name"
          type="text"
          error={touched.lastName && errors.lastName}
          placeholder="Israeli"
          width="col-md-4"
          required
        />
        <Input
          {...getFieldProps("phone")}
          name="phone"
          label="Phone Number"
          type="tel"
          error={touched.phone && errors.phone}
          placeholder="055-555-5555"
          width="col-md-4"
          required
        />
      </div>
      <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center">
        <Input
          {...getFieldProps("email")}
          name="email"
          label="Email"
          type="email"
          error={touched.email && errors.email}
          placeholder="name@domain.com"
          width="col-md-4"
          required
        />
        <Input
          {...getFieldProps("password")}
          name="password"
          label="Password"
          type="password"
          error={touched.password && errors.password}
          width="col-md-4"
          required
        />
      </div>
      <div className=" d-flex flex-column flex-md-row gap-3">
        <Input
          {...getFieldProps("country")}
          name="country"
          label="Country"
          type="text"
          error={touched.country && errors.country}
          placeholder="Israel"
          width="col-md-4"
          required
        />
        <Input
          {...getFieldProps("city")}
          name="city"
          label="City"
          type="text"
          error={touched.city && errors.city}
          placeholder="Tel-Aviv"
          width="col-md-4"
          required
        />
        <Input
          {...getFieldProps("street")}
          name="street"
          label="Street"
          type="text"
          error={touched.street && errors.street}
          placeholder="Rothschild"
          width="col-md-4"
          required
        />
      </div>
      <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center align-items-md-end">
        <Input
          {...getFieldProps("houseNumber")}
          name="houseNumber"
          label="House Number"
          type="number"
          error={touched.houseNumber && errors.houseNumber}
          placeholder="123"
          width="col-md-4"
          required
        />
        <Input
          {...getFieldProps("zip")}
          name="zip"
          label="Zip Code"
          type="number"
          error={touched.zip && errors.zip}
          placeholder="11223344"
          width="col-md-4"
          required
        />

        <div className="mb-3 col-md-4 d-flex flex-column justify-content-center align-items-center">
          <input
            {...getFieldProps("isBusiness")}
            type="checkbox"
            className="btn-check"
            id="isBusiness"
            name="isBusiness"
            autoComplete="off"
          />
          <label
            className="btn btn-outline-warning border-3 fw-bold"
            htmlFor="isBusiness"
          >
            Business User
          </label>
        </div>
      </div>

      <div className="my-2">
        <button
          disabled={!isValid}
          type="submit"
          className="btn btn-success col-8 col-md-4 mx-auto d-block"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default Register;
