import { type FC } from "react";
import { DashboardViewPage } from "../shared/DashboardContent";
import { playerOverviewData } from "./playerOverview.data";

export const PlayerOverview: FC = () => {
  return <DashboardViewPage {...playerOverviewData} />;
};
