import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/site/home";
import About from "./pages/site/about";
import Service from "./pages/site/services";
import Reservation from "./pages/site/booking";
import Contact from "./pages/site/contact";
import Login from "./pages/app/auth/login";
import PageTemplate from "./templates/pageTemplate";
import AppTemplate from "./templates/appTemplate";
import Signup from "./pages/app/auth/signup";
import Book from "./pages/app/book";
import Drivers from "./pages/app/drivers";
import Pricing from "./pages/app/pricing";
import Emergency from "./pages/app/emergency";
import Settings from "./pages/app/settings";
import Overview from "./pages/app/overview";
import Requests from "./pages/app/requests";
import { store } from "./store/store";
import BookingSuccess from "./components/booking/booking-success";

const isAdmin = () => {
  const state = store.getState();
  const isAdmin: any = state?.auth?.user;
  return isAdmin?.is_superuser;
};

const userRoutes = {
  path: "/dashboard",
  element: <AppTemplate />,
  children: [
    { path: "", element: <Navigate to="book" /> },
    { path: "book", element: <Book /> },
    {
      path: "book",
      element: <Book />,
      children: [{ path: "booking-success", element: <BookingSuccess /> }],
    },
    { path: "drivers", element: <Drivers /> },
    // { path: "message", element: <div>Message</div> },
    { path: "pricing", element: <Pricing /> },
    { path: "settings", element: <Settings /> },
    { path: "emergency", element: <Emergency /> },
  ],
};

const adminRoutes = {
  path: "/admin",
  element: <AppTemplate />,
  children: [
    { path: "", element: <Navigate to="overview" /> },
    { path: "overview", element: <Overview /> },
    { path: "requests", element: <Requests /> },
    { path: "settings", element: <Settings /> },
  ],
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageTemplate />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Service /> },
      { path: "booking", element: <Reservation /> },
      { path: "contact-us", element: <Contact /> },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  isAdmin() ? adminRoutes : userRoutes,
  // {
  //   path: "/dashboard",
  //   element: <AppTemplate />,
  //   children: [
  //     { path: "", element: <Navigate to="book" /> },
  //     { path: "book", element: <Book /> },
  //     { path: "drivers", element: <Drivers /> },
  //     // { path: "message", element: <div>Message</div> },
  //     { path: "pricing", element: <Pricing /> },
  //     { path: "settings", element: <Settings /> },
  //     { path: "emergency", element: <Emergency /> },
  //   ],
  // },
  // {
  //   path: "/admin",
  //   element: <AppTemplate />,
  //   children: [
  //     { path: "", element: <Navigate to="overview" /> },
  //     { path: "overview", element: <Overview /> },
  //     { path: "requests", element: <Requests /> },
  //     { path: "settings", element: <Settings /> },
  //   ],
  // },
]);

const Routes = () => <RouterProvider router={router} />;
export default Routes;
