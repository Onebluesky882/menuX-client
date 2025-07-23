import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import Payment from "./pages/payment/index.tsx";
import SignUp from "./pages/SignUp.tsx";
import { ShopRoute, MenuRoute } from "./route/Shop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="payment" element={<Payment />} />
          {ShopRoute}
          {MenuRoute}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
