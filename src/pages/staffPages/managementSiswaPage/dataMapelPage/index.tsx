import React from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { Table } from "../../../../features/staffPages/dataKesiswaanPage/dataMapelPage/table";

export const DataMapelMangementSiswaPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Data Mata Pelajaran" subTitle="Data Mata Pelajaran SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
