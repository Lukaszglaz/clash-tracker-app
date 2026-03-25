import { type FC } from "react";
import { DashboardViewPage } from "../shared/DashboardContent";
import { armyLayoutData } from "./armyLayout.data";

export const ArmyLayout: FC = () => {
  return <DashboardViewPage {...armyLayoutData} />;
};
