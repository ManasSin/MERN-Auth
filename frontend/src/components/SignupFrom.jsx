import { Link, useNavigate } from "react-router-dom";
import InputField from "./UI/inputfield";
import Button from "./ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/api/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const SignupFrom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [crendential, setCrendential] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

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
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {" "}
          Sign up with us{" "}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={signupHandler}>
          <InputField
            label={"Enter your name"}
            htmlfor={"name"}
            type={"text"}
            // name={crendential.name}
            value={crendential.name}
            onChange={handleFromChange}
          />

          <InputField
            label={"Email address"}
            htmlfor={"email"}
            type={"email"}
            // name={crendential.email}
            value={crendential.email}
            onChange={handleFromChange}
          />

          <InputField
            label={"Password"}
            htmlfor={"password"}
            type={"password"}
            // name={crendential.password}
            value={crendential.password}
            onChange={handleFromChange}
          />
          <InputField
            label={"Confirm Password"}
            htmlfor={"ConfirmPassword"}
            type={"password"}
            // name={crendential.password}
            value={crendential.ConfirmPassword}
            onChange={handleFromChange}
          />

          <div>
            <Button
              type={"submit"}
              onClick={() => {}}
              text={isLoading ? "Loading..." : "Sign up"}
            />
          </div>
        </form>

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
