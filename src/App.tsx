import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Service from "./pages/service";
import Pricing from "./pages/pricing";
import Reservation from "./pages/reservation";
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
    path: "/service",
    element: <Service />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/reservation",
    element: <Reservation />,
  },
  {
    path: "/",
    element: <Contact />,
  },
]);

const Routes = () => <RouterProvider router={router} />;
export default Routes;
