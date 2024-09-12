import React from "react";
import PropTypes from "prop-types";

import Navbar from "../layouts/navbar";
import Footer from "../layouts/footer";

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  return (
    <div className="bg-customLightGray min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
