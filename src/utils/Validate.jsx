export const checkValidData = (email, password) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])(?=.{8,})/.test(password);

  if (!isEmailValid) return "Email is Not Valid";
  if (!isPasswordValid) return "Password is Not Valid";
  return null;
};
