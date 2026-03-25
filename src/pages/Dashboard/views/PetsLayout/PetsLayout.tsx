import { type FC } from "react";
import { DashboardViewPage } from "../shared/DashboardContent";
import { petsLayoutData } from "./petsLayout.data";

export const PetsLayout: FC = () => {
  return <DashboardViewPage {...petsLayoutData} />;
};
