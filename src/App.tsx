import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Service from "./pages/services";
import Reservation from "./pages/booking";
import Contact from "./pages/contact";
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
]);

const Routes = () => <RouterProvider router={router} />;
export default Routes;
