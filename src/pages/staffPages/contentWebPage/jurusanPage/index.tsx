import React from "react";
import { Table } from "../../../../features/staffPages/contentWebPage/jurusanPage/table";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const JurusanPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Jurusan" subTitle="Jurusan Web SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
