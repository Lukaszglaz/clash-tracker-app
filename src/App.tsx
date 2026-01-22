import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { type FC } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/Layout/Layout";

import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage/VerifyEmailPage";
import { CheckEmailPage } from "./pages/CheckEmailPage/CheckEmailPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage/ResetPasswordPage";

export const App: FC = () => {
  return (
    <>
      <ToastContainer theme="dark" position="top-right" />

      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/check-email" element={<CheckEmailPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route
            path="/dashboard"
            element={<div className="p-20 text-text-main">Dashboard</div>}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
