import React from "react";

import { Header } from "../../../features/contentWebPage/facilityPage/header";
import { Table } from "../../../features/contentWebPage/facilityPage/table";

export const FacilityPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="" backDisplay={false} addDisplay={true} />
      <Table />
    </>
  );
};
