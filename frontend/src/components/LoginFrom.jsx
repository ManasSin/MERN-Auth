import { Link, useNavigate } from "react-router-dom";
import InputField from "./UI/inputfield";
import Button from "./ui/button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/api/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

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

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleFromChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredential({
      ...credential,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = credential;
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
        <form className="space-y-6" method="POST" onSubmit={submitHandler}>
          <InputField
            label={"Email address"}
            htmlfor={"email"}
            type={"email"}
            name={credential.email}
            value={credential.email}
            onChange={handleFromChange}
          />

          <InputField
            label={"Password"}
            htmlfor={"password"}
            type={"password"}
            otherlinklabel={"Forgot Password"}
            otherlink={"/"}
            name={credential.password}
            value={credential.password}
            onChange={handleFromChange}
          />

          <div>
            <Button
              type={"submit"}
              text={isLoading ? "Loading..." : "Log in"}
              onClick={() => {}}
            />
          </div>
        </form>

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
