import React from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { Table } from "../../../../features/staffPages/managementStaffPage/dataStaffPage/table";

export const DataStaffMangementStaffPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Data Pegawai" subTitle="Data Pegawai SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
