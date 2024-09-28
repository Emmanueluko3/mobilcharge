import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
const router = createBrowserRouter([
  {
    path: "/", // Site Layout for public pages
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
    path: "/dashboard",
    element: <AppTemplate />,
    children: [
      { path: "book", element: <Book /> },
      { path: "trucks", element: <div>Trucks</div> },
      { path: "message", element: <div>Message</div> },
    ],
  },
]);

const Routes = () => <RouterProvider router={router} />;
export default Routes;
