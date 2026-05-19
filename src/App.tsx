import { type FC, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import { Layout } from "./components/Layout/Layout";
import { ProtectedRoute, PublicRoute } from "./components/Guards/Guards";
import { AuthProvider } from "./context/AuthContext";
import { ScrollToTop } from "./components/shared/ScrollToTop/ScrollToTop";

import {
  HomePage,
  LoginPage,
  RegisterPage,
  VerifyEmailPage,
  CheckEmailPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  DashBoardPage,
  DashboardOverview,
} from "./routes/lazyRoutes";

const AppLayout: FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export const App: FC = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <ToastContainer
        theme="dark"
        position="top-right"
        transition={Zoom}
        autoClose={3000}
      />

      <Suspense fallback={<div className="min-h-screen bg-bg-page" />}>
        <Routes>
          <Route element={<AppLayout />}>
            {/* PUBLICZNE TRASY */}
            <Route path="/" element={<HomePage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/check-email" element={<CheckEmailPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* CHRONIONE TRASY */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashBoardPage />}>
                <Route index element={<DashboardOverview />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};
