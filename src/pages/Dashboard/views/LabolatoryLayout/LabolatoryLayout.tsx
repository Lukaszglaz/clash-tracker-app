import { type FC } from "react";
import { DashboardViewPage } from "../shared/DashboardContent";
import { laboratoryLayoutData } from "./laboratoryLayout.data";

export const LaboratoryLayout: FC = () => {
  return <DashboardViewPage {...laboratoryLayoutData} />;
};
