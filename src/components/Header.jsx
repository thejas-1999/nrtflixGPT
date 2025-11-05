import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState, useRef } from "react";
import { LOGO, SUPPORTED_LANG } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { selectPreferdLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  // Detect click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unSubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
    setMobileMenuOpen(false); // close menu after sign out
  };

  const handleGPTSearchClick = () => {
    dispatch(toggleGptSearchView());
    setMobileMenuOpen(false); // close menu after clicking
  };

  const handleLanguageChange = (e) => {
    dispatch(selectPreferdLanguage(e.target.value));
    setMobileMenuOpen(false); // close menu after changing language
  };

  return (
    <header className="w-full absolute top-0 left-0 px-4 sm:px-8 py-3 bg-gradient-to-b from-black/90 to-transparent z-10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img src={LOGO} className="w-28 sm:w-40" alt="logo" />

        {/* Desktop Menu */}
        {user && (
          <div className="hidden sm:flex items-center gap-4">
            {showGptSearch && (
              <select
                name="language-selector"
                className="p-2 bg-gray-900 text-white rounded-lg text-sm sm:text-base"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANG.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <button
              className="py-1.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-sm sm:text-base font-semibold"
              onClick={handleGPTSearchClick}
            >
              {showGptSearch ? "Back To Home" : "GPT Search"}
            </button>

            <div className="flex items-center gap-2">
              <img
                src={user?.photoURL}
                alt="user-icon"
                className="h-10 w-10 rounded-full border border-gray-500"
              />
              <button
                className="font-semibold text-white cursor-pointer hover:text-red-400 text-sm sm:text-base"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        {user && (
          <div className="sm:hidden relative" ref={menuRef}>
            <button
              className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded-lg text-white font-semibold"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              Menu
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg flex flex-col gap-2 p-2 text-white z-20">
                {showGptSearch && (
                  <select
                    name="language-selector"
                    className="p-2 bg-gray-800 text-white rounded-lg text-sm w-full"
                    onChange={handleLanguageChange}
                  >
                    {SUPPORTED_LANG.map((lang) => (
                      <option key={lang.identifier} value={lang.identifier}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                )}
                <button
                  className="py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 w-full"
                  onClick={handleGPTSearchClick}
                >
                  {showGptSearch ? "Back To Home" : "GPT Search"}
                </button>
                <button
                  className="py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 w-full flex items-center gap-2"
                  onClick={handleSignOut}
                >
                  <img
                    src={user?.photoURL}
                    alt="user-icon"
                    className="h-6 w-6 rounded-full"
                  />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
