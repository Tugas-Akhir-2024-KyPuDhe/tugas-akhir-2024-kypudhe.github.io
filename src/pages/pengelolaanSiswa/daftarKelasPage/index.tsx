import React from "react";
import { Table } from "../../../features/pengelolaanSiswa/daftarKelasPage/table";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const DaftarKelasPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Daftar Kelas" subTitle="Daftar Kelas SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
