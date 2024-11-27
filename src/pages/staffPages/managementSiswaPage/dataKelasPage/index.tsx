import React from "react";
import { Table } from "../../../../features/staffPages/dataKesiswaanPage/dataKelasPage/table";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const DataKelasMangementSiswaPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Data Kelas Siswa" subTitle="Data Kelas Siswa SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
