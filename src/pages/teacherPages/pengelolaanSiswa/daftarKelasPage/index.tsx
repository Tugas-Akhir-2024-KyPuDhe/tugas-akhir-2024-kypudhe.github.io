import React from "react";
import { Table } from "../../../../features/teacherPages/pengelolaanSiswa/daftarKelasPage/table";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const DaftarKelasPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Daftar Kelas Guru" subTitle="Daftar Ajaran Kelas Guru SMKN 1 Lumban Julu" backDisplay={false} addDisplay={false} linkAdd="tambah"/>
      <Table />
    </>
  );
};
