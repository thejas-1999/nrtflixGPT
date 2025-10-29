import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInFormHandler = () => {
    return setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/186b5d52-052d-4779-b061-5eed089a99a6/web/IN-en-20251020-TRIFECTA-perspective_2972aef3-a02d-4d1c-9098-126151b3c3ee_small.jpg"
          alt="logo"
        />
      </div>
      <form className="w-3/12 absolute p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-black/80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <input
          type="text"
          placeholder="Email Address"
          className="my-4 p-4 w-full bg-gray-800"
        />
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 w-full bg-gray-800"
          />
        )}
        <input
          type="password"
          placeholder="Password"
          className="my-4 p-4 w-full bg-gray-800"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInFormHandler}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};
export default Login;
