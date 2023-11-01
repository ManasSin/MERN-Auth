import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/api/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import FormikInput from "./ui/FormikInput";
import { Form, Formik } from "formik";
import { LoginSchema } from "../Schema/validationSchema";

const LoginFrom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const initialValue = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await login({ ...values }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
          Sign in to your account{" "}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValue}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6" method="POST">
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

              <div>
                <Button
                  type={"submit"}
                  text={isLoading ? "Loading..." : "Log in"}
                  onClick={() => {}}
                />
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up with us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginFrom;
