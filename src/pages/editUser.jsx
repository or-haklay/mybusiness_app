import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import Joi from "joi";
import { useFormik } from "formik";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/common/loadingSpinners";

function EditUser() {
  const { user, updateUser, userData } = useAuth();
  const navigate = useNavigate();
  const { getFieldProps, isValid, handleSubmit, errors, touched } = useFormik({
    validateOnMount: true,
    initialValues: {
      firstName: userData?.name?.first,
      lastName: userData?.name?.last,
      phone: userData?.phone,
      country: userData?.address?.country,
      city: userData?.address?.city,
      street: userData?.address?.street,
      houseNumber: userData?.address?.houseNumber,
      zip: userData?.address?.zip,
    },
    enableReinitialize: true,
    validate: (values) => {
      const schema = Joi.object({
        firstName: Joi.string().min(2).max(256).label("First Name"),
        lastName: Joi.string().min(2).max(256).label("Last Name"),
        phone: Joi.string().min(9).max(11).label("Phone Number"),
        country: Joi.string().min(2).max(256).label("Country"),
        city: Joi.string().min(2).max(256).label("City"),
        street: Joi.string().min(2).max(256).label("Street"),
        houseNumber: Joi.number().label("House Number"),
        zip: Joi.number().label("Zip Code"),
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
      try {
        const response = await updateUser(values, user?._id);
        console.log(response.data);
        navigate("/");
        toast.success("User Updated Successfully");
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    },
  });

  if (!userData) {
    return (
      <div className="container mt-5">
        <PageHeader title="Edit User" description={"Loading User Data..."} />
        <LoadingSpinner text={"Loading User Data..."} />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <PageHeader
        title="Edit User"
        description={"This Page Is For Editing User"}
      />
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-5 gap-3 container flex-fill mx-auto justify-content-center my-5"
      >
        <div className="d-flex flex-column flex-md-row gap-2 justify-content-center align-items-md-start">
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
        <div className=" d-flex flex-column flex-md-row gap-2 justify-content-center align-items-md-start">
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
        </div>

        <div className="my-2">
          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-success col-8 col-md-4 mx-auto d-block"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
