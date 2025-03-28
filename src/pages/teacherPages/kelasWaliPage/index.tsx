import React from "react";
import { Table } from "../../../features/teacherPages/kelasWaliPage/table";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const KelasWaliPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Kelas Wali Guru" subTitle="Daftar Kelas Wali Guru" backDisplay={false} addDisplay={false} linkAdd="tambah"/>
      <Table />
    </>
  );
};
