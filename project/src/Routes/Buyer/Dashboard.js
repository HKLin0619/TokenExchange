import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Buyer/Navbar";
import ProfileCard from "../../Components/Content/ProfileCard/ProfileCard";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const successParam = queryParams.get("success");

    if (successParam === "true") {
      toast.success("Token Purchased Successfully !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else if (successParam === "trueTender"){
      toast.success("Uploaded Tender Successfully !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [location.search]);

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <ProfileCard userData={storedUserData} />
    </>
  );
}

export default Dashboard;
