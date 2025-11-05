import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE, USER_ICON } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_ICON,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => setErrorMessage(error.message));
        })
        .catch((error) => setErrorMessage(error.code + "_" + error.message));
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {})
        .catch((error) => setErrorMessage(error.code + "_" + error.message));
    }
  };

  const toggleSignInFormHandler = () => setIsSignInForm(!isSignInForm);

  return (
    <div className="relative min-h-screen bg-black/40 overflow-hidden">
      <Header className="bg-transparent" />
      <img
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={BACKGROUND_IMAGE}
        alt="background"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-11/12 sm:w-8/12 md:w-3/12 p-6 sm:p-8 md:p-12 mx-auto mt-24 md:mt-36 bg-black/80 text-white rounded-lg relative"
      >
        <h1 className="font-bold text-2xl sm:text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 w-full bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          className="my-4 p-4 w-full bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          autoComplete={isSignInForm ? "current-password" : "new-password"}
          className="my-4 p-4 w-full bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
        />

        <p className="text-red-600 text-sm sm:text-lg py-2">{errorMessage}</p>

        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer hover:bg-red-800 transition"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="py-4 text-center cursor-pointer text-sm sm:text-base hover:underline"
          onClick={toggleSignInFormHandler}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
