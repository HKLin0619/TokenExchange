import React from "react";
import Navbar from "../../Components/Navbar/Admin/Navbar";
import Content from "../../Components/Content/Admin/UpdateFundStatus";
import { useLocation } from "react-router-dom";

function UpdateFundStatus() {
  const location = useLocation();
  return (
    <div className="main-content">
      <Navbar currentPage={location.pathname} />
      <Content />
    </div>
  );
}

export default UpdateFundStatus;
