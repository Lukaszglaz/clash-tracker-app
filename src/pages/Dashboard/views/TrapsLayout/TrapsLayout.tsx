import { type FC } from "react";
import { DashboardViewPage } from "../shared/DashboardContent";
import { trapsLayoutData } from "./trapsLayout.data";

export const TrapsLayout: FC = () => {
  return <DashboardViewPage {...trapsLayoutData} />;
};
