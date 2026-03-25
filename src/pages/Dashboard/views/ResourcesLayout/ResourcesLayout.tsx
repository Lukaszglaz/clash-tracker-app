import { type FC } from "react";
import { DashboardViewPage } from "../shared/DashboardContent";
import { resourcesLayoutData } from "./resourcesLayout.data";

export const ResourcesLayout: FC = () => {
  return <DashboardViewPage {...resourcesLayoutData} />;
};
