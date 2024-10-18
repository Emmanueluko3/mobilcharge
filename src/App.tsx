import {
  createBrowserRouter,
  Navigate,
  Outlet,
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
import Drivers from "./pages/app/drivers";
import Pricing from "./pages/app/pricing";
import Emergency from "./pages/app/emergency";
import Settings from "./pages/app/settings";
import Overview from "./pages/app/overview";
import Requests from "./pages/app/request/requests";
import CheckoutBooking from "./pages/app/book/checkout";
import CreateBooking from "./pages/app/book/book";
import BookingSuccessful from "./pages/app/book/booking-successful";
import RequestDetails from "./pages/app/request/details";
import ForgotPassowrd from "./pages/app/auth/forgot-password";
import ResetPassword from "./pages/app/auth/reset-password";

const userRoutes = {
  path: "/dashboard",
  element: <AppTemplate />,
  children: [
    { path: "", element: <Navigate to="book" /> },
    {
      path: "book",
      element: <Outlet />,
      children: [
        { path: "", element: <CreateBooking /> },
        { path: "checkout/:id?", element: <CheckoutBooking /> },
        { path: "booking-successful/:invoice", element: <BookingSuccessful /> },
      ],
    },
    { path: "drivers", element: <Drivers /> },
    { path: "pricing", element: <Pricing /> },
    { path: "settings", element: <Settings /> },
    {
      path: "emergency",
      element: <Outlet />,
      children: [
        { path: "", element: <Emergency /> },
        { path: "checkout/:id?", element: <CheckoutBooking /> },
        { path: "booking-successful/:details", element: <BookingSuccessful /> },
      ],
    },
  ],
};

const adminRoutes = {
  path: "/admin",
  element: <AppTemplate />,
  children: [
    { path: "", element: <Navigate to="overview" /> },
    { path: "overview", element: <Overview /> },
    {
      path: "requests",
      element: <Outlet />,
      children: [
        { path: "", element: <Requests /> },
        { path: ":invoice_id?", element: <RequestDetails /> },
      ],
    },
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
  {
    path: "/forgot-password",
    element: <ForgotPassowrd />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  adminRoutes,
  userRoutes,
]);

const Routes = () => <RouterProvider router={router} />;
export default Routes;
