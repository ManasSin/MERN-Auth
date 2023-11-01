import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import Button from "./ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/api/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { validationSchema } from "../Schema/validationSchema";
import FormikInput from "./ui/FormikInput";
import FormikTextarea from "./ui/FormikTextarea";

const SignupFrom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const initialValue = {
    name: "",
    address: "",
    email: "",
    website: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await register({
        ...values,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="public/vite.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {" "}
          Sign up with us{" "}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6" method="POST">
              <FormikInput
                label={"Enter your name"}
                name={"name"}
                type={"text"}
                placeholder={"Enter your name"}
              />
              <FormikInput
                label={"Email address"}
                name={"email"}
                type={"email"}
                placeholder={"Enter your Address"}
              />
              <FormikInput
                label={"Password"}
                name={"password"}
                type={"password"}
                placeholder={"Please Enter Password"}
              />
              <FormikInput
                label={"Confirm Password"}
                name={"confirmPassword"}
                type={"password"}
                placeholder={"Confirm Password"}
              />
              <FormikInput
                label={"Add Phone"}
                name={"phone"}
                type={"tel"}
                placeholder={"Pleae add Phone"}
              />
              <FormikInput
                label={"Website"}
                name={"website"}
                type={"text"}
                placeholder={"Enter Website Link"}
              />

              <FormikTextarea
                label={"Address"}
                name={"address"}
                type={"text-area"}
                placeholder={"Enter address here"}
              />
              <div>
                <Button
                  type={"submit"}
                  onClick={() => {}}
                  text={isLoading ? "Loading..." : "Sign up"}
                />
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupFrom;
