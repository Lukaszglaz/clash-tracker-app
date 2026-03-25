import { type FC } from "react";
import { DashboardViewPage } from "../shared/DashboardContent";
import { defenseLayoutData } from "./defenseLayout.data";

export const DefenseLayout: FC = () => {
  return <DashboardViewPage {...defenseLayoutData} />;
};
