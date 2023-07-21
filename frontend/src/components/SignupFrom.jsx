import { Link } from "react-router-dom";
import InputField from "./UI/inputfield";
import Button from "./ui/button";

const SignupFrom = () => {
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
        <form className="space-y-6" action="#" method="POST">
          <InputField
            label={"Enter your name"}
            htmlfor={"name"}
            type={"text"}
          />

          <InputField
            label={"Email address"}
            htmlfor={"email"}
            type={"email"}
          />

          <InputField
            label={"Password"}
            htmlfor={"password"}
            type={"password"}
          />

          <div>
            <Button type={"submit"} onClick={() => {}} text={"Sign up"} />
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
