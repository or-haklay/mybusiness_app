import Input from "../components/common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth.context";
import { toast } from "react-hot-toast";

function SignIn() {
  const { user, signIn } = useAuth();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { getFieldProps, handleSubmit, touched, errors, isValid } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnMount: true,
    validate(values) {
      const schema = Joi.object({
        email: Joi.string()
          .required()
          .min(5)
          .email({ tlds: { allow: false } })
          .email({ tlds: false })
          .label("Email"),
        password: Joi.string().min(7).max(20).label("Password").required(),
      });
      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }

      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        const response = await signIn({
          email: values.email,
          password: values.password,
        });
        navigate("/");
        toast.success("Welcome back!");
        console.log(response.data);
      } catch (error) {
        if (error.response?.status === 400) {
          console.log(error);
          setServerError(error.response.data);
          toast.error("Invalid email or password");
        } else {
          console.log(error);
          toast.error("Something went wrong, please try again later.");
        }
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column p-5 gap-3 container flex-fill mx-auto justify-content-center"
    >
      {serverError && (
        <div className="alert alert-danger" role="alert">
          Invalid email or password
        </div>
      )}
      <Input
        {...getFieldProps("email")}
        name="email"
        label="Email"
        type="email"
        error={touched.email ? errors.email : ""}
        placeholder="name@domain.com"
        required
      />
      <Input
        {...getFieldProps("password")}
        name="password"
        label="Password"
        type="password"
        error=""
        required
      />
      <div className="my-2">
        <button
          disabled={!isValid}
          type="submit"
          className="btn btn-success col-8 col-md-4 mx-auto d-block"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

export default SignIn;
