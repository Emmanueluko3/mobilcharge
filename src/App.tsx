import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/site/home";
import About from "./pages/site/about";
import Service from "./pages/site/services";
import Reservation from "./pages/site/booking";
import Contact from "./pages/site/contact";
import Login from "./pages/app/auth/login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/services",
    element: <Service />,
  },
  {
    path: "/booking",
    element: <Reservation />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const Routes = () => <RouterProvider router={router} />;
export default Routes;
