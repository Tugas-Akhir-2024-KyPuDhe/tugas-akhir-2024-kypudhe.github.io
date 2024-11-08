import React from "react";

import { Header } from "../../../features/contentWebPage/jurusanPage/header";
import { Table } from "../../../features/contentWebPage/jurusanPage/table";

export const JurusanPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="" backDisplay={false} addDisplay={true} />
      <Table />
    </>
  );
};
