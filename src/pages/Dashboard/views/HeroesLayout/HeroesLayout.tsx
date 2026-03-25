import { type FC } from "react";
import { DashboardViewPage } from "../shared/DashboardContent";
import { heroesLayoutData } from "./heroesLayout.data";

export const HeroesLayout: FC = () => {
  return <DashboardViewPage {...heroesLayoutData} />;
};
