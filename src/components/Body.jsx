import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browser from "./Browser";
import Login from "./Login";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
const Body = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // simulate load
    return () => clearTimeout(timer);
  }, []);
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browser />,
    },
  ]);

  return (
    <div>
      {loading ? <LoadingSpinner /> : <RouterProvider router={appRouter} />}
    </div>
  );
};
export default Body;
