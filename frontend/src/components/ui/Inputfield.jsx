import { Link } from "react-router-dom";

const InputField = ({
  label,
  htmlfor,
  type,
  otherlink = false,
  otherlinklabel,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor={htmlfor}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {otherlink && (
          <div className="text-sm">
            <Link
              to={otherlink}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {otherlinklabel}
            </Link>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          id={htmlfor}
          name={htmlfor}
          type={type}
          // autoComplete={type}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
        />
      </div>
    </div>
  );
};

export default InputField;
