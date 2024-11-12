import React from "react";

import { Table } from "../../../features/teacherPages/mapelPage/table";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const GuruMapelPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Mata Pelajaran" subTitle="Mata Pelajaran SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
