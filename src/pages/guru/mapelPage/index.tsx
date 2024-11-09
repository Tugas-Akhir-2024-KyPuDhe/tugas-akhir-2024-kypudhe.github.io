import React from "react";

import { Header } from "../../../features/guru/mapelPage/header";
import { Table } from "../../../features/guru/mapelPage/table";

export const GuruMapelPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="" backDisplay={false} addDisplay={true} />
      <Table />
    </>
  );
};
