import { lazy } from "react";

export const HomePage = lazy(() =>
  import("../pages/HomePage/HomePage").then((m) => ({ default: m.HomePage })),
);
export const LoginPage = lazy(() =>
  import("../pages/LoginPage/LoginPage").then((m) => ({
    default: m.LoginPage,
  })),
);
export const RegisterPage = lazy(() =>
  import("../pages/RegisterPage/RegisterPage").then((m) => ({
    default: m.RegisterPage,
  })),
);
export const VerifyEmailPage = lazy(() =>
  import("../pages/VerifyEmailPage/VerifyEmailPage").then((m) => ({
    default: m.VerifyEmailPage,
  })),
);
export const CheckEmailPage = lazy(() =>
  import("../pages/CheckEmailPage/CheckEmailPage").then((m) => ({
    default: m.CheckEmailPage,
  })),
);
export const ForgotPasswordPage = lazy(() =>
  import("../pages/ForgotPasswordPage/ForgotPasswordPage").then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);
export const ResetPasswordPage = lazy(() =>
  import("../pages/ResetPasswordPage/ResetPasswordPage").then((m) => ({
    default: m.ResetPasswordPage,
  })),
);
export const DashBoardPage = lazy(() =>
  import("../pages/Dashboard/DashboardPage").then((m) => ({
    default: m.DashBoardPage,
  })),
);
export const DashboardOverview = lazy(() =>
  import("../pages/Dashboard/views/DashboardOverview").then((m) => ({
    default: m.DashboardOverview,
  })),
);
