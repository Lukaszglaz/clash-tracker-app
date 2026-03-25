import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { type FC, lazy, Suspense } from "react";
import { ToastContainer, Zoom } from "react-toastify";

import { Layout } from "./components/Layout/Layout";
import { ProtectedRoute, PublicRoute } from "./components/Guards/Guards";
import { AuthProvider } from "./context/AuthContext";
import { ScrollToTop } from "./components/shared/ScrollToTop/ScrollToTop";
import { SettingsLayout } from "./pages/Dashboard/views/SettingsLayout/SettingsLayout";
import { PlayerOverview } from "./pages/Dashboard/views/PlayerOverview/PlayerOverview";
import { ArmyLayout } from "./pages/Dashboard/views/ArmyLayout/ArmyLayout";
import { DefenseLayout } from "./pages/Dashboard/views/DefenseLayout/DefenseLayout";
import { ResourcesLayout } from "./pages/Dashboard/views/ResourcesLayout/ResourcesLayout";
import { TrapsLayout } from "./pages/Dashboard/views/TrapsLayout/TrapsLayout";
import { PetsLayout } from "./pages/Dashboard/views/PetsLayout/PetsLayout";
import { LaboratoryLayout } from "./pages/Dashboard/views/LabolatoryLayout/LabolatoryLayout";
import { HeroesLayout } from "./pages/Dashboard/views/HeroesLayout/HeroesLayout";

// --- LAZY IMPORTS ---
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
  import("./pages/Dashboard/DashboardPage").then((m) => ({
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
            {/* PUBLICZNE TRASY */}
            <Route path="/" element={<HomePage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/check-email" element={<CheckEmailPage />} />

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* CHRONIONE TRASY */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashBoardPage />}>
                <Route index element={<PlayerOverview />} />
                <Route path="army" element={<ArmyLayout />} />
                <Route path="defense" element={<DefenseLayout />} />
                <Route path="resources" element={<ResourcesLayout />} />
                <Route path="traps" element={<TrapsLayout />} />
                <Route path="laboratory" element={<LaboratoryLayout />} />
                <Route path="heroes" element={<HeroesLayout />} />
                <Route path="pets" element={<PetsLayout />} />
                <Route path="settings" element={<SettingsLayout />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};
