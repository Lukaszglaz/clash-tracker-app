import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { type FC } from "react";
import { ToastContainer } from "react-toastify";

import { Layout } from "./components/Layout/Layout";
import { ProtectedRoute, PublicRoute } from "./components/Guards/Guards";
import { AuthProvider } from "./context/AuthContext";

import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage/VerifyEmailPage";
import { CheckEmailPage } from "./pages/CheckEmailPage/CheckEmailPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage/ResetPasswordPage";
import { DashBoardPage } from "./pages/Dashboard/Dashboard";
import { ScrollToTop } from "./components/shared/ScrollToTop/ScrollToTop";

const AppLayout: FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export const App: FC = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <ToastContainer theme="dark" position="top-right" />

      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/check-email" element={<CheckEmailPage />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/dashboard" element={<DashBoardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};
