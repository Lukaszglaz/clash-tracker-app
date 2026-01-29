import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { type FC, lazy, Suspense } from "react";
import { ToastContainer, Zoom } from "react-toastify";

import { Layout } from "./components/Layout/Layout";
import { ProtectedRoute, PublicRoute } from "./components/Guards/Guards";
import { AuthProvider } from "./context/AuthContext";
import { ScrollToTop } from "./components/shared/ScrollToTop/ScrollToTop";

const HomePage = lazy(() =>
  import("./pages/HomePage/HomePage").then((m) => ({ default: m.HomePage })),
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage").then((m) => ({
    default: m.RegisterPage,
  })),
);
const VerifyEmailPage = lazy(() =>
  import("./pages/VerifyEmailPage/VerifyEmailPage").then((m) => ({
    default: m.VerifyEmailPage,
  })),
);
const CheckEmailPage = lazy(() =>
  import("./pages/CheckEmailPage/CheckEmailPage").then((m) => ({
    default: m.CheckEmailPage,
  })),
);
const ForgotPasswordPage = lazy(() =>
  import("./pages/ForgotPasswordPage/ForgotPasswordPage").then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);
const ResetPasswordPage = lazy(() =>
  import("./pages/ResetPasswordPage/ResetPasswordPage").then((m) => ({
    default: m.ResetPasswordPage,
  })),
);
const DashBoardPage = lazy(() =>
  import("./pages/Dashboard/Dashboard").then((m) => ({
    default: m.DashBoardPage,
  })),
);

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
      </Suspense>
    </AuthProvider>
  );
};
