import { Link } from "react-router-dom";
import InputField from "./UI/inputfield";
import { useState } from "react";
import Button from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateMutation } from "../slices/api/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [crendential, setCrendential] = useState({
    name: userInfo.name,
    email: userInfo.email,
    password: "",
    ConfirmPassword: "",
  });

  const handleFromChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCrendential({
      ...crendential,
      [name]: value,
    });
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    if (crendential.password !== crendential.ConfirmPassword) {
      toast.error("Passwords Do not match");
    } else {
      try {
        const { name, email, password } = crendential;
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updates");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
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
            Displayed in most useless manar.
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
                <form
                  className="space-y-6"
                  method="POST"
                  onSubmit={signupHandler}
                >
                  <InputField
                    label={"Name"}
                    htmlfor={"name"}
                    type={"text"}
                    value={crendential.name}
                    onChange={handleFromChange}
                    placeholder={userInfo?.name}
                  />

                  <InputField
                    label={"Email address"}
                    htmlfor={"email"}
                    type={"email"}
                    value={crendential.email}
                    onChange={handleFromChange}
                    placeholder={userInfo?.email}
                  />

                  <InputField
                    label={"Password"}
                    htmlfor={"password"}
                    type={"password"}
                    value={crendential.password}
                    onChange={handleFromChange}
                  />
                  <InputField
                    label={"Confirm Password"}
                    htmlfor={"ConfirmPassword"}
                    type={"password"}
                    value={crendential.ConfirmPassword}
                    onChange={handleFromChange}
                  />

                  <div>
                    <Button
                      type={"submit"}
                      onClick={() => {}}
                      text={isLoading ? "Loading..." : "Update Data"}
                    />
                  </div>
                </form>
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
