import { Link } from "react-router-dom";
import Button from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateMutation } from "../slices/api/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { Form, Formik } from "formik";
import FormikInput from "./ui/FormikInput";
import FormikTextarea from "./ui/FormikTextarea";
import { validationSchema } from "../Schema/validationSchema";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateMutation();

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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        ...values,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updates");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    setSubmitting(false);
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8  z-0">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl pt-14 sm:pt-28 lg:pt-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Displayed in most useless manner.{" "}
            <Link to="" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Useless profile page
          </h1>
          <div className="mt-4 sm:mt-10 flex items-center justify-center gap-x-6">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-7 lg:px-8">
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                  initialValues={initialValue}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6 text-start" method="POST">
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
                          text={isLoading ? "Loading..." : "Update Data"}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
};

export default ProfileScreen;
