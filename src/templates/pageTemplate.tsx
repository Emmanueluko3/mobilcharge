import React from "react";
import PropTypes from "prop-types";

import Navbar from "../layouts/navbar";
import Footer from "../layouts/footer";
import { Outlet } from "react-router-dom";

const PageTemplate: React.FC = () => {
  return (
    <div className="bg-customLightGray min-h-screen">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
