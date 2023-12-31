import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
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
      <div className="mx-auto max-w-2xl py-28 sm:py-32 lg:py-42">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Welcome to ultimate authentication code.{" "}
            <Link to="" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Backend and Frontend authentication code.
          </h1>
          <div className="flex flex-col md:flex-row md:justify-center md:items-center justify-between">
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-sm mx-auto sm:max-w-xs w-full">
              {/* Extream usefull and robust authentication system build using MERN
              stack, <br />  */}
              Express, mongoDB, mongoose ORM, Node Js, Joi validation, HTTP
              cookies, JWT. in backend.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-sm mx-auto sm:max-w-xs w-full">
              React JS, Redux toolkit, tailwind CSS, React-Router-Dom, Axios,
              and Toastify in frontend.
            </p>
          </div>
          {userInfo ? (
            <div className="my-10">
              <div className="relative w-fit mx-auto rounded-full px-3 py-1 leading-6 text-lg font-semibold text-gray-900">
                Welcome {userInfo.name}.
                <Link to="/profile" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Visit Profile <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/login"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Sign up <span aria-hidden="true">→</span>
                </Link>
              </div>
            </>
          )}
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

export default HomePage;
