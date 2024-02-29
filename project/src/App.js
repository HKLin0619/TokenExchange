import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Routes/Login";
import AdminDashboard from "./Routes/Admin/Dashboard";
import BuyerDashboard from "./Routes/Buyer/Dashboard";
import FinancierDashboard from "./Routes/Financier/Dashboard";
import TokenMinting from "./Routes/Admin/TokenMinting";
import ViewToken from "./Routes/Admin/viewToken";
import SignUp from "./Routes/SignUp";
import PurchaseToken from "./Routes/Buyer/PurchaseToken";
import UploadTenderAwards from "./Routes/Buyer/UploadTenderAward";
import SearchAward from "./Routes/Financier/SearchAward";
import SearchAwardID from "./Routes/Financier/SearchAwardID";
import UpdateFundStatus from "./Routes/Financier/UpdateFundStatus";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/buyerdashboard" element={<BuyerDashboard />} />
        <Route path="/financierdashboard" element={<FinancierDashboard />} />
        <Route path="/admindashboard/tokenminting" element={<TokenMinting />} />
        <Route path="/admindashboard/viewtoken" element={<ViewToken />} />
        <Route
          path="/buyerdashboard/purchasetoken"
          element={<PurchaseToken />}
        />
        <Route
          path="/buyerdashboard/uploadtenderawards"
          element={<UploadTenderAwards />}
        />
        <Route
          path="/financierdashboard/searchaward"
          element={<SearchAward />}
        />
        <Route
          path="/financierdashboard/searchawardid"
          element={<SearchAwardID />}
        />
        <Route
          path="/financierdashboard/updatefundstatus"
          element={<UpdateFundStatus />}
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
