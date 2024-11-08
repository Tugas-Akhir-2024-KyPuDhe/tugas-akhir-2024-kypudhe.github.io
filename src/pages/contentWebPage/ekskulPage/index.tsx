import React from "react";

import { Header } from "../../../features/contentWebPage/ekskulPage/header";
import { Table } from "../../../features/contentWebPage/ekskulPage/table";

export const EkskulPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="" backDisplay={false} addDisplay={true} />
      <Table />
    </>
  );
};
